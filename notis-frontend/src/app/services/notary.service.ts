import {Injectable} from '@angular/core';
import {baseUrl} from '../core/global';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable(
)
export class NotaryService {

  private urlPart = 'notaries/';

  constructor(private http: HttpClient) {

  }

  getAllNotaries(): Observable<any> {
    // Global.baseUrl + this.urlPart + '/findAll'
    return this.http.get('http://157.230.180.203:8080/notis/test/getAllNotaries', {responseType: 'json'}).pipe(map(
      res => res
    ));
  }
}
