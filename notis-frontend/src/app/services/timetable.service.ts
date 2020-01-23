import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {baseUrl} from '../core/global';
import {Timetable} from '../models/timetable.model';

@Injectable(
)
export class TimetableService {


  private urlPart = baseUrl + 'timetables/';

  constructor(private http: HttpClient) {

  }

  update(timetable: Timetable, entityId): Observable<any> {
    timetable.id = entityId;
    return this.http.put(this.urlPart, timetable).pipe(map(
      data => Object.assign(new Timetable(), data)
    ));
  }
}
