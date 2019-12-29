import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable(
)
export class TranslatorService {

  private urlPart = 'translators/';

  constructor(private http: HttpClient) {

  }

  getAllTranslators(): Observable<any> {
    // Global.baseUrl + this.urlPart + '/findAll'
    return this.http.get('http://157.230.180.203:8080/notis/test/getAllTranslators', {responseType: 'json'}).pipe(map(
      res => res
    ));
  }
}
