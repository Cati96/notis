import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {baseUrl} from '../core/global';
import {Translator} from '../models/translator.model';

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
  addTranslator(translator : Translator): Observable<any> {
      return this.http.post(this.urlPart,{name: translator.name,
                                          authorizationNumber: translator.authorizationNumber,
                                          phoneNumber: translator.phoneNumber,
                                          languages: translator.languages
      }).pipe(map(
          data => Object.assign(new Translator(), data)
      ));
    }
  delete(id){
        return this.http.delete<any>(this.urlPart+id);
      }
  update(translator : Translator): Observable<any> {
         return this.http.put(this.urlPart, translator).pipe(map(
             data => Object.assign(new Translator(), data)
         ));
   }
}
