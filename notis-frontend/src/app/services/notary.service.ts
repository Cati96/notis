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

  getAllNotariesForSelectedServicesOffered(servicesOffered): Observable<any> {
    return this.http.post(this.urlPart + 'getAllForSelectedServicesOffered', servicesOffered).pipe(map(res => res));
  }

  addNotary(notary: Notary): Observable<any> {
    const languages = [];
    languages.push('English');
    return this.http.post(this.urlPart, {
      name: notary.name,
      authorizationNumber: notary.authorizationNumber,
      phoneNumber: notary.phoneNumber,
      languages: languages
    }).pipe(map(
      data => Object.assign(new Notary(), data)
    ));
  }

  delete(id) {
    return this.http.delete<any>(this.urlPart + id);
  }

  update(notary: Notary): Observable<any> {
    return this.http.put(this.urlPart, notary).pipe(map(
      data => Object.assign(new Notary(), data)
    ));
  }
}
