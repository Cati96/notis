import {AfterViewInit, Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Address} from '../../../../models/address.model';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

declare var ol: any;

@Component({
  selector: 'app-dialog-box-address-user',
  templateUrl: './dialog-box-address-user.component.html',
  styleUrls: ['./dialog-box-address-user.component.css']
})
export class DialogBoxAddressUserComponent implements OnInit, AfterViewInit {

  localData: Address;
  entityType: string;

  latitude: number;
  longitude: number;

  constructor(private http: HttpClient, public dialogRef: MatDialogRef<DialogBoxAddressUserComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.localData = data.data;
    this.entityType = data.entityType;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getCoordinatesFromStringAddressAndSetTheMap(this.localData);
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

  getJsonDataFromStringAddress(address): Observable<any> {
    const stringAddress = address.number + '+strada+' + address.street + '%2C+' + address.city + '%2C+' + address.country;
    // const stringAddress = '20+strada+Petre+Tutea%2C+Iasi%2C+Romania';
    const url = 'https://nominatim.openstreetmap.org/search?q=' + stringAddress + '&format=geojson';
    console.log('Searched address:' + stringAddress);
    return this.http.get(url, {responseType: 'json'})
      .pipe(map(
        res => res
      ));
  }

  getCoordinatesFromStringAddressAndSetTheMap(address) {
    let result;
    this.getJsonDataFromStringAddress(address).subscribe(res => {
      if (res === null || res === undefined || res.features === null || res.features.length === 0) {
      } else {
        // first is longitude, second is latitude
        result = res.features[0].geometry.coordinates;
        this.longitude = result[0];
        this.latitude = result[1];
      }
      this.setMap();
    });
  }

  setMap() {
    let coordinatesAreFound = true;
    if (this.longitude === undefined || this.latitude === undefined) {
      // Romania coordinates
      this.latitude = 45.9432;
      this.longitude = 24.9668;
      coordinatesAreFound = false;
      console.log('Address not found. Setting generic one without marker.');
    } else {
      coordinatesAreFound = true;
    }

    const coordinates = ol.proj.fromLonLat([this.longitude, this.latitude]);
    const mapOsmView = new ol.View({
      center: coordinates,
      zoom: coordinatesAreFound ? 15 : 6
    });

    const vectorSource = new ol.source.Vector({});
    const places = [
      // [longitude, latitude]
    ];
    places.push([this.longitude, this.latitude]);

    const markerStyle = new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        src: 'http://maps.google.com/mapfiles/ms/micons/blue.png',
        color: '#4271AE',
        crossOrigin: 'anonymous',
      })
    });

    if (coordinatesAreFound) {
      for (const place of places) {
        const markerFeature = new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.transform(place, 'EPSG:4326', 'EPSG:3857')),
        });
        markerFeature.setStyle(markerStyle);
        vectorSource.addFeature(markerFeature);
      }
    }


    const vectorLayer = new ol.layer.Vector({
      source: vectorSource,
      updateWhileAnimating: true,
      updateWhileInteracting: true,
    });

    const myMap = new ol.Map({
      target: 'map-container',
      view: mapOsmView,
      layers: [
        new ol.layer.Tile({
          preload: 3,
          source: new ol.source.OSM(),
        }),
        vectorLayer,
      ],
      loadTilesWhileAnimating: true,
      loadTilesWhileInteracting: true,
    });
  }

  testMultipleMarkers() {
    this.longitude = 27.579372;
    this.latitude = 47.142196;
    const coordinates = ol.proj.fromLonLat([this.longitude, this.latitude]);
    const mapOsmView = new ol.View({
      center: coordinates,
      zoom: 15
    });

    const vectorSource = new ol.source.Vector({});
    const places = [
      // [longitude, latitude]
      [27.579372, 47.142196],
      [27.589111, 47.156495],
      [27.588563, 47.155381],
      [27.589583, 47.157167]
    ];

    const markerStyle = new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        src: 'http://maps.google.com/mapfiles/ms/micons/blue.png',
        color: '#4271AE',
        crossOrigin: 'anonymous',
      })
    });

    for (const place of places) {
      const markerFeature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.transform(place, 'EPSG:4326', 'EPSG:3857')),
      });

      markerFeature.setStyle(markerStyle);
      vectorSource.addFeature(markerFeature);
    }


    const vectorLayer = new ol.layer.Vector({
      source: vectorSource,
      updateWhileAnimating: true,
      updateWhileInteracting: true,
    });

    const myMap = new ol.Map({
      target: 'map-container',
      view: mapOsmView,
      layers: [
        new ol.layer.Tile({
          preload: 3,
          source: new ol.source.OSM(),
        }),
        vectorLayer,
      ],
      loadTilesWhileAnimating: true,
      loadTilesWhileInteracting: true,
    });
  }
}


