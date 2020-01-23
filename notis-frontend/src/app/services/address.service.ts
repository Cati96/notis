import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {baseUrl} from '../core/global';
import {Address} from '../models/address.model';
@Injectable()
export class AddressService {

  private urlPart = baseUrl + 'addresses/';

  constructor(private http: HttpClient) {

  }

  getAllAddressesForEntityType(entityType): Observable<any> {
    const params = '?' + 'entityType=' + entityType;
    return this.http.get(this.urlPart + 'getAllForEntityType' + params, {responseType: 'json'})
      .pipe(map(res => res));
  }

  getAllAddressesForEntityTypeAndCustomLocation(entityType: any, city: any, locality: any): Observable<any> {
    const params = '?' + 'entityType=' + entityType + '&city=' + city + '&locality=' + locality;
    return this.http.get(this.urlPart + 'getAllForEntityTypeAndCustomLocation' + params, {responseType: 'json'})
      .pipe(map(res => res));
  }
  update(address : Address, entityId): Observable<any> {
         debugger;
         address.id = entityId;
         return this.http.put(this.urlPart,address).pipe(map(
             data => Object.assign(new Address(), data)
         ));
       }
}
