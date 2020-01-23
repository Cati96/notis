import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {baseUrl} from '../core/global';
import {Service} from '../models/service.model';
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

  getAllServiceTypesForEntityType(entityType): Observable<any> {
    const params = '?' + 'entityType=' + entityType;
    return this.http.get(this.urlPart + 'getAllTypesForEntityType' + params, {responseType: 'json'}).pipe(map(
      res => res
    ));
  }
  add(service: Service, serviceId){
    return this.http.post(this.urlPart,{type: service.type,
                                            description: service.description,
                                            id: service.id,
                                            entityId: serviceId
        }).pipe(map(
            data => Object.assign(new Service(), data)
        ));
  }
  update(service: Service, serviceId){
      return this.http.put(this.urlPart,{type: service.type,
                                              description: service.description,
                                              id: service.id,
                                              entityId: serviceId
          }).pipe(map(
              data => Object.assign(new Service(), data)
          ));
    }
   delete(serviceId, entityId){
        return this.http.delete<any>(this.urlPart+entityId+"/"+serviceId);
      }
}
