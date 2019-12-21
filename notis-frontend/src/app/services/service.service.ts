import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable(
)
export class ServiceService {

  private urlPart = 'services/';

  constructor(private http: HttpClient) {

  }

  getAllServices(): Observable<any> {
    // Global.baseUrl + this.urlPart + '/findAll'
    return this.http.get('http://157.230.180.203:8080/notis/test/getAllServices', {responseType: 'json'}).pipe(map(
      res => res
    ));
  }
}
