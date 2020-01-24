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

  update(address: Address, entityId): Observable<any> {
    address.id = entityId;
    return this.http.put(this.urlPart, address).pipe(map(
      data => Object.assign(new Address(), data)
    ));
  }
}
