import {Injectable} from '@angular/core';

export const baseUrl = 'http://157.230.180.203:4200/';

@Injectable()
export class GlobalProvider {
  static isAdministrator: boolean;
  static isRegularUser: boolean;

  constructor() {
    console.log('Hello GlobalProvider Provider');
  }

}

