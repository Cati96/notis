import {Injectable} from '@angular/core';

export const baseUrl = 'http://157.230.180.203:8080/notis/';

@Injectable()
export class GlobalProvider {
  static isAdministrator: boolean;
  static isRegularUser: boolean;

  constructor() {
    console.log('Hello GlobalProvider Provider');
  }

  static getAddressForSearchInUrl(address) {
    console.log(address);
    let stringAddress = '';
    if (address.streetNumber !== undefined && address.streetNumber !== null && address.streetNumber.length > 0) {
      stringAddress += address.streetNumber;
      if (address.street !== undefined && address.street !== null && address.street.length > 0) {
        stringAddress += '+';
      }
    }
    if (address.street !== undefined && address.street !== null && address.street.length > 0) {
      stringAddress += 'strada+' + encodeURIComponent(address.street);
      if ((address.locality !== undefined && address.locality !== null && address.locality.length > 0) ||
        (address.city !== undefined && address.city !== null && address.city.length > 0) ||
        (address.zipCode !== undefined && address.zipCode !== null && address.zipCode.length > 0) ||
        (address.country !== undefined && address.country !== null && address.country.length > 0)) {
        stringAddress += '%2C+';
      }
    }
    if (address.locality !== undefined && address.locality !== null && address.locality.length > 0) {
      stringAddress += encodeURIComponent(address.locality);
      if ((address.city !== undefined && address.city !== null && address.city.length > 0) ||
        (address.zipCode !== undefined && address.zipCode !== null && address.zipCode.length > 0) ||
        (address.country !== undefined && address.country !== null && address.country.length > 0)) {
        stringAddress += '%2C+';
      }
    }
    if (address.city !== undefined && address.city !== null && address.city.length > 0) {
      stringAddress += encodeURIComponent(address.city);
      if ((address.zipCode !== undefined && address.zipCode !== null && address.zipCode.length > 0) ||
        (address.country !== undefined && address.country !== null && address.country.length > 0)) {
        stringAddress += '%2C+';
      }
    }
    if (address.zipCode !== undefined && address.zipCode !== null && address.zipCode.length > 0) {
      stringAddress += address.zipCode;
      if (address.country !== undefined && address.country !== null && address.country.length > 0) {
        stringAddress += '%2C+';
      }
    }
    if (address.country !== undefined && address.country !== null && address.country.length > 0) {
      stringAddress += encodeURIComponent(address.country);
    }
    return stringAddress;
  }

}

