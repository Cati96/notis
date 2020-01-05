import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {baseUrl} from '../core/global';

@Injectable(
)
export class ServiceService {

  private urlPart = baseUrl + 'services/';

  constructor(private http: HttpClient) {

  }

  getAllServicesForEntityTypeAndEntityId(entityType, entityId): Observable<any> {
    const params = '?' + 'entityType=' + entityType + '&entityId=' + entityId;
    return this.http.get(this.urlPart + 'getAllForEntityTypeAndEntityId' + params, {responseType: 'json'}).pipe(map(
      res => res
    ));
  }
}
