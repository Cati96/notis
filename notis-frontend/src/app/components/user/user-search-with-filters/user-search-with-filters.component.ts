import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild, ViewEncapsulation} from '@angular/core';

import 'ol/ol.css';
import * as ol from 'ol';
import Feature from 'ol/Feature';
import Geolocation from 'ol/Geolocation';
import Map from 'ol/Map';
import View from 'ol/View';
import Point from 'ol/geom/Point';
import Circle from 'ol/geom/Circle';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Circle as CircleStyle, Fill, Stroke, Style, Icon} from 'ol/style';
import {fromLonLat, METERS_PER_UNIT, getPointResolution} from 'ol/proj';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {AddressService} from '../../../services/address.service';
import {Address} from '../../../models/address.model';
import {GlobalProvider} from '../../../core/global';
import {NotaryService} from '../../../services/notary.service';
import {TranslatorService} from '../../../services/translator.service';
import {Notary} from '../../../models/notary.model';

@Component({
  selector: 'app-user-search-with-filters',
  templateUrl: './user-search-with-filters.component.html',
  styleUrls: ['./user-search-with-filters.component.css']
})

export class UserSearchWithFiltersComponent implements OnInit, AfterViewInit {

  entitiesData = ['Notary', 'Translator'];
  isChecked: boolean;
  isCheckedName: string;
  filters = ['----', 'Your current location', 'Custom location', 'Services offered'];

  isSearchingByCurrentLocation = false;
  isSearchingByCustomLocation = false;
  isSearchingByServicesOffered = false;

  isLocationFound: boolean;

  mapOSM: any;
  circle: any;

  validEntities = [];

  @ViewChild('searchDropdown', {static: true}) searchDropdown: ElementRef;
  @ViewChild('mapContainerForSearchByCurrentLocation', {static: true}) mapContainerForSearchByCurrentLocation: ElementRef;


  constructor(private renderer: Renderer2, private http: HttpClient, private addressService: AddressService,
              private  notaryService: NotaryService, private  translatorService: TranslatorService) {
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

  onChange(e) {
    this.isChecked = !this.isChecked;
    this.isCheckedName = e.target.name;

    if (!this.isChecked) {
      this.isSearchingByCurrentLocation = false;
      this.isSearchingByCustomLocation = false;
      this.isSearchingByServicesOffered = false;
      // first child is the label element and the second is the select element
      this.searchDropdown.nativeElement.children[1].selectedIndex = 0;
    }
  }

  filterSearch(value) {
    if (typeof this.mapContainerForSearchByCurrentLocation !== 'undefined') {
      this.deleteMapContainerElements(this.mapContainerForSearchByCurrentLocation);
    }
    if (value === this.filters[0]) {
      console.log('Nothing selected');
      this.isSearchingByCurrentLocation = false;
      this.isSearchingByCustomLocation = false;
      this.isSearchingByServicesOffered = false;
    } else {
      console.log('Selected:' + value);
      if (value === this.filters[1]) {
        this.isSearchingByCurrentLocation = true;
        this.isSearchingByCustomLocation = false;
        this.isSearchingByServicesOffered = false;
        this.addContentForSearchByCurrentLocation();
      } else if (value === this.filters[2]) {
        this.isSearchingByCurrentLocation = false;
        this.isSearchingByCustomLocation = true;
        this.isSearchingByServicesOffered = false;

        this.addContentForSearchByCustomLocation();
      } else if (value === this.filters[3]) {
        this.isSearchingByCurrentLocation = false;
        this.isSearchingByCustomLocation = true;
        this.isSearchingByServicesOffered = false;

        this.addContentForSearchByServicesOffered();
      }
    }
  }


  setGeolocationAndCreateMap() {
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

    this.mapOSM = new Map({
      target: 'map-container-current-location',
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
        console.log('New coords: ' + coordinates);

        positionFeature.setGeometry(coordinates ?
          new Point(coordinates) : null);

        this.centerMap(coordinates);

        this.drawCircleInMeter(5000);

        this.getAllAddressesForEntityAndSetOnlyValidOnTheMap(this.isCheckedName);

        const vectorLayer = new VectorLayer({
          map: this.mapOSM,
          source: new VectorSource({
            features: [accuracyFeature, positionFeature]
          })
        });

        const container = document.getElementsByClassName('popup')[0];
        const popup = container.cloneNode(true);
        // @ts-ignore
        popup.id = 'popup';
        const overlay = new ol.Overlay({
          element: popup,
          autoPan: true,
          autoPanAnimation: {
            duration: 250
          }
        });
        this.mapOSM.addOverlay(overlay);

        const closer = document.getElementById('popup-closer');
        closer.onclick = () => {
          overlay.setPosition(undefined);
          closer.blur();
          return false;
        };

        const content = document.getElementById('popup-content');
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
    });
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

  checkIfPointsAreInCircleAreaAndMarkThem(place) {
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
      console.log('Valid:');
      console.log(place);
      result = place;
    } else {
      console.log('Invalid:');
      console.log(place);
      result = null;
    }

    const vectorLayer = new VectorLayer({
      map: this.mapOSM,
      source: vectorSource
    });
    return result;
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

  getAllAddressesForEntityAndSetOnlyValidOnTheMap(entityType) {
    this.addressService.getAllAddressesForEntityType(entityType).subscribe(addresses => {
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
              const temp = this.checkIfPointsAreInCircleAreaAndMarkThem(result);
              if (temp != null) {
                if (this.isCheckedName === 'Notary') {
                  this.notaryService.getAllNotariesForAddressId(address.id).subscribe(entities => {
                    for (const entity of entities) {
                      this.validEntities.push(entity);
                    }
                    this.validEntities = this.validEntities.filter((thing, index, self) =>
                      index === self.findIndex((t) => (
                        t.place === thing.place && t.name === thing.name
                      ))
                    );
                  });
                } else if (this.isCheckedName === 'Translator') {
                  this.translatorService.getAllTranslatorsForAddressId(address.id).subscribe(entities => this.validEntities.push(entities));
                }
              }
            }
          });
        }
      }
    });
    console.log('TO DO GET ALL ADDRESSES FOR NOTARIES/TRANSLATORS');
  }

  prettyPrintAddress(address) {
    return 'street: ' + address.street + '\nstreetNumber: '
      + address.streetNumber + '\ncity: ' + address.city + '\ncounty: ' + address.county + '\ncountry: '
      + address.country + '\nothers: ' + address.others;
  }

  addContentForSearchByCurrentLocation() {
    this.setGeolocationAndCreateMap();
  }

  addContentForSearchByCustomLocation() {
  }

  addContentForSearchByServicesOffered() {
  }

  deleteMapContainerElements(mapContainer) {
    const childElements = mapContainer.nativeElement.children;
    for (const child of childElements) {
      this.renderer.removeChild(mapContainer.nativeElement, child);
    }
  }
}
