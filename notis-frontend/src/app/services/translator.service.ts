import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {baseUrl} from '../core/global';

@Injectable(
)
export class TranslatorService {

  private urlPart = baseUrl + 'translators/';

  constructor(private http: HttpClient) {

  }

  getAllTranslators(): Observable<any> {
    return this.http.get(this.urlPart + 'getAll', {responseType: 'json'}).pipe(map(
      res => res
    ));
  }

  getAllTranslatorsForAddressId(addressId): Observable<any> {
    const params = '?' + 'addressId=' + addressId;
    return this.http.get(this.urlPart + 'getAllForAddressId' + params, {responseType: 'json'}).pipe(map(
      res => res
    ));
  }

  getAllTranslatorsForSelectedServicesOffered(servicesOffered): Observable<any> {
    return this.http.post(this.urlPart + 'getAllForSelectedServicesOffered', servicesOffered).pipe(map(res => res));
  }
}
