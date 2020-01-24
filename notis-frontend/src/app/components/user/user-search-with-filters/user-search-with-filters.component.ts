import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';

import 'ol/ol.css';
import * as ol from 'ol';
import Feature from 'ol/Feature';
import Geolocation from 'ol/Geolocation';
import OSMMap from 'ol/Map';
import View from 'ol/View';
import Point from 'ol/geom/Point';
import Circle from 'ol/geom/Circle';
import Polygon from 'ol/geom/Polygon';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Circle as CircleStyle, Fill, Stroke, Style, Icon} from 'ol/style';
import {fromLonLat, METERS_PER_UNIT, getPointResolution, transform} from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {AddressService} from '../../../services/address.service';
import {Address} from '../../../models/address.model';
import {GlobalProvider} from '../../../core/global';
import {NotaryService} from '../../../services/notary.service';
import {TranslatorService} from '../../../services/translator.service';
import {ServiceService} from '../../../services/service.service';
import {CountyCityLocality} from '../../../core/county.city.locality';
import {Router} from '@angular/router';
import {DialogBoxTimetableUserComponent} from '../modals/dialog-box-timetable-user/dialog-box-timetable-user.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-user-search-with-filters',
  templateUrl: './user-search-with-filters.component.html',
  styleUrls: ['./user-search-with-filters.component.css']
})
export class UserSearchWithFiltersComponent implements OnInit, AfterViewInit {

  entityTypes = ['Notary', 'Translator'];
  isEntityChecked: boolean;
  checkedEntityName: string;

  filtersSearchBy = ['Select', 'Your current location', 'Custom location', 'Services offered'];

  servicesOffered = [];

  isSearchingByCurrentLocation = false;
  isSearchingByCustomLocation = false;
  isSearchingByServicesOffered = false;

  isLocationFound: boolean;

  mapOSM: any;
  circle: any;

  validEntities = [];
  startedToSearchByServicesOffered = false;

  ccl = new CountyCityLocality();

  @ViewChild('searchDropdown', {static: true}) searchDropdown: ElementRef;
  @ViewChild('countyDropdown', {static: true}) countyDropdown: ElementRef;
  @ViewChild('cityDropdown', {static: true}) cityDropdown: ElementRef;
  @ViewChild('localityDropdown', {static: true}) localityDropdown: ElementRef;

  @ViewChild('mapContainerForSearchByCurrentLocation', {static: true}) mapContainerForSearchByCurrentLocation: ElementRef;
  @ViewChild('mapContainerForSearchByCustomLocation', {static: true}) mapContainerForSearchByCustomLocation: ElementRef;
  @ViewChild('mapContainerForSearchByServicesOffered', {static: true}) mapContainerForSearchByServicesOffered: ElementRef;

  constructor(private renderer: Renderer2, private http: HttpClient, private addressService: AddressService,
              private  notaryService: NotaryService, private  translatorService: TranslatorService,
              private serviceService: ServiceService, private router: Router, private dialog: MatDialog) {
    this.isLocationFound = false;
    window.onchange = () => {
      setTimeout(() => {
        if (this.isSearchingByCurrentLocation && this.mapOSM !== undefined) {
          this.mapOSM.updateSize();
        }
      }, 200);
    };
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  onChangeEntityType(e) {
    this.isEntityChecked = !this.isEntityChecked;
    this.checkedEntityName = e.target.name;

    this.validEntities = [];

    if (!this.isEntityChecked) {
      this.isSearchingByCurrentLocation = false;
      this.isSearchingByCustomLocation = false;
      this.isSearchingByServicesOffered = false;
      // first child is the label element and the second is the select collection of options element
      this.searchDropdown.nativeElement.children[1].children[0].selectedIndex = 0;

      this.revertSearchByCustomLocationVariables();
      this.revertSearchByServicesOfferedVariables();
    }
  }

  onChangeFilterSearch(value) {
    this.validEntities = [];
    this.revertSearchByCustomLocationVariables();
    this.revertSearchByServicesOfferedVariables();
    if (typeof this.mapContainerForSearchByCurrentLocation !== 'undefined') {
      this.deleteMapContainerElements(this.mapContainerForSearchByCurrentLocation);
    }
    if (typeof this.mapContainerForSearchByCustomLocation !== 'undefined') {
      this.isLocationFound = false;
      this.deleteMapContainerElements(this.mapContainerForSearchByCustomLocation);
    }
    if (typeof this.mapContainerForSearchByServicesOffered !== 'undefined') {
      this.deleteMapContainerElements(this.mapContainerForSearchByServicesOffered);
    }
    this.isSearchingByCurrentLocation = false;
    this.isSearchingByCustomLocation = false;
    this.isSearchingByServicesOffered = false;
    if (value === this.filtersSearchBy[0]) {
    } else {
      if (value === this.filtersSearchBy[1]) {
        this.isSearchingByCurrentLocation = true;
        this.setCurrentLocationAndCreateMap();
      } else if (value === this.filtersSearchBy[2]) {
        this.isSearchingByCustomLocation = true;
        document.getElementsByClassName('search-by-city-locality-button')[0].addEventListener('click', () => {
          setTimeout(() => {
            if (this.isSearchingByCustomLocation && this.mapOSM !== undefined && this.mapOSM !== null) {
              this.mapOSM.updateSize();
            }
          }, 500);
        });
      } else if (value === this.filtersSearchBy[3]) {
        this.isSearchingByServicesOffered = true;
        document.getElementsByClassName('search-by-services-offered-button')[0].addEventListener('click', () => {
          setTimeout(() => {
            if (this.isSearchingByServicesOffered && this.mapOSM !== undefined && this.mapOSM !== null) {
              this.mapOSM.updateSize();
            }
          }, 500);
        });
        this.setServicesOffered(this.checkedEntityName);
      }
    }
  }

  searchByCityAndLocality() {
    if (typeof this.mapContainerForSearchByCustomLocation !== 'undefined') {
      this.isLocationFound = false;
      this.deleteMapContainerElements(this.mapContainerForSearchByCustomLocation);
    }
    this.setCustomLocationAndCreateMap();
  }

  searchByServicesOffered() {
    if (typeof this.mapContainerForSearchByServicesOffered !== 'undefined') {
      this.deleteMapContainerElements(this.mapContainerForSearchByServicesOffered);
    }
    this.setSelectedServicesOfferedAndCreateMap();
  }

  setCurrentLocationAndCreateMap() {
    this.mapOSM = null;
    this.validEntities = [];
    this.circle = null;
    this.isLocationFound = false;
    let geolocation = null;
    let accuracyFeature = null;

    const mapOsmView = new View({
      center: fromLonLat([0, 0]),
      zoom: 2
    });

    geolocation = new Geolocation({
      // enableHighAccuracy must be set to true to have the heading value.
      trackingOptions: {
        enableHighAccuracy: true
      }
    });
    geolocation.setTracking(true);
    geolocation.setProjection(mapOsmView.getProjection());

    accuracyFeature = new Feature();

    this.createMapOnTarget('map-container-current-location', mapOsmView, null);

    const positionFeature = new Feature();
    positionFeature.setStyle(new Style({
      image: new CircleStyle({
        radius: 6,
        fill: new Fill({
          color: '#3399CC'
        }),
        stroke: new Stroke({
          color: '#fff',
          width: 2
        })
      })
    }));

    geolocation.on('change:accuracyGeometry', () => {
      accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
    });

    geolocation.on('change:position', () => {
      if (!this.isLocationFound) {
        this.isLocationFound = true;

        const coordinates = geolocation.getPosition();
        console.log('New geographic coords: ' + coordinates);

        const lonlat = transform(coordinates, 'EPSG:3857', 'EPSG:4326');
        console.log('New coords lon lat: ' + [lonlat[1], lonlat[0]]);


        positionFeature.setGeometry(coordinates ?
          new Point(coordinates) : null);

        this.centerMap(coordinates);

        this.drawCircleInMeter(5000);

        this.getAllEntitiesAndSetOnlyValidAddressesInAreaOnTheMap(this.checkedEntityName);

        const vectorLayer = new VectorLayer({
          map: this.mapOSM,
          source: new VectorSource({
            features: [accuracyFeature, positionFeature]
          })
        });
        this.addPopupForMarker('popup-marker-current-location');
      }
    });
  }

  setCustomLocationAndCreateMap() {
    this.mapOSM = null;
    this.validEntities = [];
    this.isLocationFound = false;

    this.getJsonDataFromCityAndLocality(this.ccl.selectedCity, this.ccl.selectedLocality).subscribe(addr => {
      if (addr === null || addr === undefined || addr.features === addr || addr.features.length === 0) {
        this.isLocationFound = false;
        alert('Sorry.Custom location not found.');
      } else {
        this.isLocationFound = true;

        // first is longitude, second is latitude
        const temp = addr.features[0].geometry.coordinates;
        const coordinates = fromLonLat([temp[0], temp[1]]);
        console.log('New geographic coords: ' + coordinates);
        console.log('New coords lon lat: ' + [temp[1], temp[0]]);

        const mapOsmView = new View({
          center: coordinates,
          zoom: 11
        });

        const positionFeature = new Feature();
        positionFeature.setStyle(new Style({
          image: new CircleStyle({
            radius: 6,
            fill: new Fill({
              color: '#3399CC'
            }),
            stroke: new Stroke({
              color: '#fff',
              width: 2
            })
          })
        }));

        positionFeature.setGeometry(coordinates ?
          new Point(coordinates) : null);

        const vectorLayer = new VectorLayer({
          map: this.mapOSM,
          source: new VectorSource({
            features: [positionFeature]
          }),
          updateWhileAnimating: true,
          updateWhileInteracting: true,
        });
        this.createMapOnTarget('map-container-custom-location', mapOsmView, vectorLayer);
        this.getAllEntitiesForCustomLocationAndMarkThem(this.checkedEntityName, this.ccl.selectedCity, this.ccl.selectedLocality);
        this.addPopupForMarker('popup-marker-custom-location');
        this.createPolygonAroundTheCityAndReturnVectorLayer();
      }
    });
  }

  setSelectedServicesOfferedAndCreateMap() {
    this.mapOSM = null;
    this.startedToSearchByServicesOffered = true;
    this.validEntities = [];

    // Romania coordinates
    const latitude = 45.9432;
    const longitude = 24.9668;

    const coordinates = fromLonLat([longitude, latitude]);
    console.log('New geographic coords: ' + coordinates);
    console.log('New coords lon lat: ' + [latitude, longitude]);

    const mapOsmView = new View({
      center: coordinates,
      zoom: 6
    });

    const positionFeature = new Feature();
    positionFeature.setStyle(new Style({
      image: new CircleStyle({
        radius: 6,
        fill: new Fill({
          color: '#3399CC'
        }),
        stroke: new Stroke({
          color: '#fff',
          width: 2
        })
      })
    }));

    positionFeature.setGeometry(coordinates ?
      new Point(coordinates) : null);

    const vectorLayer = new VectorLayer({
      map: this.mapOSM,
      source: new VectorSource({
        features: [positionFeature]
      }),
      updateWhileAnimating: true,
      updateWhileInteracting: true,
    });
    this.createMapOnTarget('map-container-services-offered', mapOsmView, vectorLayer);

    const selectedServices = this.getSelectedServicesOffered();

    this.getAndSetEntitiesOnMapBySelectedServiceS(selectedServices, this.checkedEntityName);

    this.addPopupForMarker('popup-marker-services-offered');
  }

  centerMap(coords) {
    const view = this.mapOSM.getView();
    view.setCenter(coords);
    view.setZoom(11);
  }

  drawCircleInMeter(rad) {
    const view = this.mapOSM.getView();
    const projection = view.getProjection();
    const resolutionAtEquator = view.getResolution();
    const center = this.mapOSM.getView().getCenter();
    const pointResolution = getPointResolution(projection, resolutionAtEquator, center);
    const resolutionFactor = resolutionAtEquator / pointResolution;
    const radius = (rad / METERS_PER_UNIT.m) * resolutionFactor;


    this.circle = new Circle(center, radius);
    const circleFeature = new Feature(this.circle);

    // Source and vector layer
    const vectorSource = new VectorSource({
      projection: 'EPSG:4326'
    });
    vectorSource.addFeature(circleFeature);
    const vectorLayerForCircle = new VectorLayer({
      source: vectorSource
    });
    this.mapOSM.addLayer(vectorLayerForCircle);
  }

  checkIfPointIsInCircleAreaAndMarkItOnMap(place) {
    const vectorSource = new VectorSource({});

    const markerStyle = new Style({
      image: new Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        src: 'http://maps.google.com/mapfiles/ms/micons/blue.png',
        color: '#4271AE',
        crossOrigin: 'anonymous',
      })
    });
    const coordinate = fromLonLat([place.longitude, place.latitude]);
    const point = new Point(coordinate);
    let result = null;
    if (this.circle.intersectsCoordinate(coordinate)) {
      const markerFeature = new Feature({geometry: point, name: this.prettyPrintAddress(place.addr as Address)});
      markerFeature.setStyle(markerStyle);
      vectorSource.addFeature(markerFeature);
      console.log('Valid:', place);
      result = place;
    } else {
      console.log('Invalid:', place);
      result = null;
    }

    const vectorLayer = new VectorLayer({
      map: this.mapOSM,
      source: vectorSource
    });
    return result;
  }

  markPointOnMap(place) {
    const vectorSource = new VectorSource({});

    const markerStyle = new Style({
      image: new Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        src: 'http://maps.google.com/mapfiles/ms/micons/blue.png',
        color: '#4271AE',
        crossOrigin: 'anonymous',
      })
    });
    const coordinate = fromLonLat([place.longitude, place.latitude]);
    const point = new Point(coordinate);
    const markerFeature = new Feature({geometry: point, name: this.prettyPrintAddress(place.addr as Address)});
    markerFeature.setStyle(markerStyle);
    vectorSource.addFeature(markerFeature);

    const vectorLayer = new VectorLayer({
      map: this.mapOSM,
      source: vectorSource
    });
  }

  addPopupForMarker(popupName) {
    const container = document.getElementsByClassName(popupName)[0];
    const popup = container.cloneNode(true);
    // @ts-ignore
    popup.id = popupName;
    const overlay = new ol.Overlay({
      element: popup,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });
    this.mapOSM.addOverlay(overlay);

    const closer = document.getElementById(popupName + '-closer');
    closer.onclick = () => {
      overlay.setPosition(undefined);
      closer.blur();
      return false;
    };

    const content = document.getElementById(popupName + '-content');
    this.mapOSM.on('singleclick', evt => {
      const name = this.mapOSM.forEachFeatureAtPixel(evt.pixel, feature => feature.get('name'));
      const coordinate = evt.coordinate;
      content.innerHTML = name;
      overlay.setPosition(coordinate);
    });

    this.mapOSM.on('pointermove', evt => {
      this.mapOSM.getTargetElement().style.cursor = this.mapOSM.hasFeatureAtPixel(evt.pixel) ? 'pointer' : '';
    });
  }

  getJsonDataFromStringAddress(address: Address): Observable<any> {
    const stringAddress = GlobalProvider.getAddressForSearchInUrl(address);
    const url = 'https://nominatim.openstreetmap.org/search?q=' + stringAddress + '&format=geojson';
    console.log('Searched address:' + stringAddress);
    return this.http.get(url, {responseType: 'json'})
      .pipe(map(
        res => {
          return res;
        }
      ));
  }

  getJsonDataFromCityAndLocality(city, locality): Observable<any> {
    const url = 'https://nominatim.openstreetmap.org/search?q=' + encodeURIComponent(locality) + '%2C+' + encodeURIComponent(city) +
      '%2C+Romania' + '&format=geojson';
    return this.http.get(url, {responseType: 'json'})
      .pipe(map(
        res => {
          return res;
        }
      ));
  }

  getAndSetEntitiesOnMapBySelectedServiceS(selectedServices, entityType) {
    if (entityType === this.entityTypes[0]) { // Notary
      const addresses = [];
      this.notaryService.getAllNotaries().subscribe(notaries => {
        this.iterateInEntitiesAndCheckForServicesOfferedAndMarkThem(notaries, selectedServices);
      });
    } else if (entityType === this.entityTypes[1]) { // Translator
      this.translatorService.getAllTranslators().subscribe(translators => {
        this.iterateInEntitiesAndCheckForServicesOfferedAndMarkThem(translators, selectedServices);
      });
    }
  }

  iterateInEntitiesAndCheckForServicesOfferedAndMarkThem(entities, selectedServices) {
    const addresses = [];
    for (const entity of entities) {
      const services = entity.services;
      let matchedServicesNumber = 0;
      for (const service of services) {
        if (selectedServices.indexOf(service.type) !== -1) {
          matchedServicesNumber++;
        }
      }
      if (matchedServicesNumber > 0) {
        entity.matchedServicesNumber = matchedServicesNumber;
        this.validEntities.push(entity);
        addresses.push(entity.address);
      }
    }

    for (const address of addresses) {
      if (address !== null) {
        let coords: any[];
        let result: { addr: any; latitude: any; longitude: any; };
        this.getJsonDataFromStringAddress(address).subscribe(res => {
          if (res === null || res === undefined || res.features === null || res.features.length === 0) {

          } else {
            // first is longitude, second is latitude
            coords = res.features[0].geometry.coordinates;
            result = {addr: address, latitude: coords[1], longitude: coords[0]};
            this.markPointOnMap(result);
          }
        });
      }
    }
  }

  getAllEntitiesAndSetOnlyValidAddressesInAreaOnTheMap(entityType) {
    this.validEntities = [];
    if (entityType === this.entityTypes[0]) { // Notary
      this.notaryService.getAllNotaries().subscribe(notaries => {
        for (const notary of notaries) {
          const address = notary.address;
          if (address !== null) {
            let coords: any[];
            let result: { addr: any; latitude: any; longitude: any; };
            this.getJsonDataFromStringAddress(address).subscribe(res => {
              if (res === null || res === undefined || res.features === null || res.features.length === 0) {

              } else {
                // first is longitude, second is latitude
                coords = res.features[0].geometry.coordinates;
                result = {addr: address, latitude: coords[1], longitude: coords[0]};
                const temp = this.checkIfPointIsInCircleAreaAndMarkItOnMap(result);
                if (temp != null) {
                  this.validEntities.push(notary);
                }
              }
            });
          }
        }
      });
    } else { // Translator
      this.translatorService.getAllTranslators().subscribe(translators => {
        for (const translator of translators) {
          const address = translator.address;
          if (address !== null) {
            let coords: any[];
            let result: { addr: any; latitude: any; longitude: any; };
            this.getJsonDataFromStringAddress(address).subscribe(res => {
              if (res === null || res === undefined || res.features === null || res.features.length === 0) {

              } else {
                // first is longitude, second is latitude
                coords = res.features[0].geometry.coordinates;
                result = {addr: address, latitude: coords[1], longitude: coords[0]};
                const temp = this.checkIfPointIsInCircleAreaAndMarkItOnMap(result);
                if (temp != null) {
                  this.validEntities.push(translator);
                }
              }
            });
          }
        }
      });
    }
  }

  getAllEntitiesForCustomLocationAndMarkThem(entityType, city, locality) {
    this.validEntities = [];
    if (entityType === this.entityTypes[0]) { // Notary
      this.notaryService.getAllNotaries().subscribe(notaries => {
        for (const notary of notaries) {
          const address = notary.address;
          if (address !== null) {
            if (address.city === city && address.locality === locality) {
              let coords: any[];
              let result: { addr: any; latitude: any; longitude: any; };
              this.getJsonDataFromStringAddress(address).subscribe(res => {
                if (res === null || res === undefined || res.features === null || res.features.length === 0) {

                } else {
                  // first is longitude, second is latitude
                  coords = res.features[0].geometry.coordinates;
                  result = {addr: address, latitude: coords[1], longitude: coords[0]};
                  this.markPointOnMap(result);
                  this.validEntities.push(notary);
                }
              });
            }
          }
        }
      });
    } else { // Translator
      this.translatorService.getAllTranslators().subscribe(translators => {
        for (const translator of translators) {
          const address = translator.address;
          if (address !== null) {
            if (address.city === city && address.locality === locality) {
              let coords: any[];
              let result: { addr: any; latitude: any; longitude: any; };
              this.getJsonDataFromStringAddress(address).subscribe(res => {
                if (res === null || res === undefined || res.features === null || res.features.length === 0) {

                } else {
                  // first is longitude, second is latitude
                  coords = res.features[0].geometry.coordinates;
                  result = {addr: address, latitude: coords[1], longitude: coords[0]};
                  this.markPointOnMap(result);
                  this.validEntities.push(translator);
                }
              });
            }
          }
        }
      });
    }
  }

  prettyPrintAddress(address) {
    return 'street: ' + address.street + '</br>number: '
      + address.streetNumber + '</br>city: ' + address.city;
  }

  deleteMapContainerElements(mapContainer) {
    const childElements = mapContainer.nativeElement.children;
    for (const child of childElements) {
      this.renderer.removeChild(mapContainer.nativeElement, child);
    }
  }

  revertSearchByCustomLocationVariables() {
    this.ccl.isCountySelected = false;
    this.ccl.isCitySelected = false;
    this.ccl.isLocalitySelected = false;
    this.ccl.selectedCounty = undefined;
    this.ccl.selectedCity = undefined;
    this.ccl.selectedLocality = undefined;
    this.countyDropdown.nativeElement.children[1].selectedIndex = 0;
    this.ccl.cities = ['Select'];
    this.ccl.localities = ['Select'];
  }

  revertSearchByServicesOfferedVariables() {
    this.servicesOffered = [];
    this.startedToSearchByServicesOffered = false;
  }

  createMapOnTarget(divContainer, mapOsmView, vectorLayer) {
    if (vectorLayer === null) {
      this.mapOSM = new OSMMap({
        target: divContainer,
        view: mapOsmView,
        layers: [
          new TileLayer({
            preload: 3,
            source: new OSM(),
          })
        ],
        loadTilesWhileAnimating: true,
        loadTilesWhileInteracting: true,
      });
    } else {
      this.mapOSM = new OSMMap({
        target: divContainer,
        view: mapOsmView,
        layers: [
          new TileLayer({
            preload: 3,
            source: new OSM(),
          }), vectorLayer
        ],
        loadTilesWhileAnimating: true,
        loadTilesWhileInteracting: true,
      });
    }
  }

  createPolygonAroundTheCityAndReturnVectorLayer() {
    const queryParams = encodeURIComponent(this.ccl.selectedLocality) + '%2C+' + encodeURIComponent(this.ccl.selectedCity)
      + '%2C+' + 'Romania';
    console.log('https://nominatim.openstreetmap.org/search?q=' + queryParams + '&polygon_geojson=1&format=geojson');
    this.http.get('https://nominatim.openstreetmap.org/search?q=' + queryParams + '&polygon_geojson=1&format=geojson')
      .pipe(map(json => {
        return json;
      })).subscribe(res => {
        // @ts-ignore
        if (res.features[0].geometry.type === 'Polygon') {
          // @ts-ignore
          const vertices = res.features[0].geometry.coordinates[0];
          const feature = new Feature({
            geometry: new Polygon([vertices])
          });
          feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');

          const vectorSource = new VectorSource({
            features: [feature]
          });
          const polygonStyle = new Style({
            fill: new Fill({
              color: 'rgba(255, 255, 255, 0.6)'
            }),
            stroke: new Stroke({
              color: '#319FD3',
              width: 1
            }),
            image: new CircleStyle({
              radius: 5,
              fill: new Fill({
                color: 'rgba(255, 255, 255, 0.6)'
              }),
              stroke: new Stroke({
                color: '#319FD3',
                width: 1
              })
            })
          });
          const vectorLayer = new VectorLayer({
            map: this.mapOSM,
            source: vectorSource,
            style: polygonStyle
          });
        }
      }
    );
  }

  setServicesOffered(entityType: string) {
    this.serviceService.getAllServiceTypesForEntityType(entityType).subscribe(res => {
      for (const type of res) {
        this.servicesOffered.push({name: type, value: type, checked: false});
      }
    });
  }

  getSelectedServicesOffered() {
    return this.servicesOffered
      .filter(opt => opt.checked)
      .map(opt => opt.name);
  }

  isAtLeastOneServiceChecked() {
    const list = this.servicesOffered
      .filter(opt => opt.checked)
      .map(opt => opt.value);
    return list.length > 0;
  }

  showServicesDetailsForEntityId(id) {
    this.router.navigate(['notaries/services'], {queryParams: {entityType: this.checkedEntityName, entityId: id}});
  }

  showTimetableDetails(timetable) {
    this.dialog.open(DialogBoxTimetableUserComponent, {
      width: '30%',
      data: {
        data: timetable,
        entityType: this.checkedEntityName
      }
    });
  }
}
