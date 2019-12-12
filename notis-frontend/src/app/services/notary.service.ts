import {Injectable} from '@angular/core';
import * as Global from '../core/global';
import { Http, Response } from '@angular/http';
import {map} from 'rxjs/operators';
import {Notary} from '../models/notary.model';

@Injectable(
)
export class NotaryService {

  private urlPart = 'notaries/';
  private  response: Notary[];

  constructor(private http: Http) {

  }

  getAllNotaries() {
    // Global.baseUrl + this.urlPart + '/findAll'
    this.http.get('http://157.230.180.203:8080/notis/test/getAllNotaries').pipe(map(
      (data: Response) => {
        this.response = data.json();
      }
    )).subscribe(
      data => {
        console.log('Success');
      },
      error => {
        console.log('Error');
      }
    );
    return this.response;
  }
}
