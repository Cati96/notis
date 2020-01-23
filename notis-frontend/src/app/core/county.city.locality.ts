// @ts-ignore
import * as countiesCitiesLocalities from '../counties-cities-localities.json';
import {Injectable} from '@angular/core';

@Injectable()
export class CountyCityLocality {

  counties = ['Select'];
  cities = ['Select'];
  localities = ['Select'];
  isCountySelected = false;
  isCitySelected = false;
  isLocalitySelected = false;
  selectedCounty: string;
  selectedCity: string;
  selectedLocality: string;

  constructor() {
    for (const county of countiesCitiesLocalities.counties) {
      this.counties.push(county.name);
    }
  }

  onChangeCounty(county) {
    this.selectedCounty = county;
    this.isCitySelected = false;
    this.isLocalitySelected = false;
    this.cities = ['Select'];
    this.localities = ['Select'];
    if (this.selectedCounty === this.counties[0]) {
      this.isCountySelected = false;
    } else {
      this.isCountySelected = true;
      for (const countyObj of countiesCitiesLocalities.counties) {
        if (countyObj.name === county) {
          for (const cities of countyObj.citites) {
            this.cities.push(cities.name);
          }
          break;
        }
      }
    }
  }

  onChangeCity(city) {
    this.selectedCity = city;
    this.isLocalitySelected = false;
    this.localities = ['Select'];
    if (this.selectedCity === this.cities[0]) {
      this.isCitySelected = false;
    } else {
      this.isCitySelected = true;
      for (const countyObj of countiesCitiesLocalities.counties) {
        if (countyObj.name === this.selectedCounty) {
          for (const cityObj of countyObj.citites) {
            if (cityObj.name === city) {
              for (const locality of cityObj.localities) {
                this.localities.push(locality);
              }
              break;
            }
          }
          break;
        }
      }
    }
  }

  onChangeLocality(locality) {
    this.selectedLocality = locality;
    this.isLocalitySelected = this.selectedLocality !== this.localities[0];
  }
}
