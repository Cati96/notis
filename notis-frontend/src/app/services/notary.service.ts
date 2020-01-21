import {Injectable} from '@angular/core';
import {baseUrl} from '../core/global';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Notary} from '../models/notary.model';
@Injectable(
)
export class NotaryService {

  private urlPart = baseUrl + 'notaries/';

  constructor(private http: HttpClient) {
  }

  getAllNotaries(): Observable<any> {
    return this.http.get(this.urlPart + 'getAll', {responseType: 'json'}).pipe(map(
      res => res
    ));
  }

  getAllNotariesForAddressId(addressId): Observable<any> {
    const params = '?' + 'addressId=' + addressId;
    return this.http.get(this.urlPart + 'getAllForAddressId' + params, {responseType: 'json'}).pipe(map(
      res => res
    ));
  }
    name: string;
    authorizationNumber: string;
    phoneNumber: string;
  addNotary(notary : Notary): Observable<any> {
    return this.http.post(this.urlPart,{name: notary.name,
                                        authorizationNumber: notary.authorizationNumber,
                                        phoneNumber: notary.phoneNumber
    }).pipe(map(
        data => Object.assign(new Notary(), data)
    ));
  }
}
