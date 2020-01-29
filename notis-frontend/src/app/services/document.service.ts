import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {baseUrl} from '../core/global';
import {Document} from '../models/document.model';

@Injectable(
)
export class DocumentService {

  private urlPart = baseUrl + 'documents/';

  constructor(private http: HttpClient) {

  }

  getAllDocumentsForEntityTypeServiceId(entityType, serviceId: number, entityId:number): Observable<any> {
    const params = '?entityType=' + entityType + '&serviceId=' + serviceId + '&entityId=' + entityId;
    return this.http.get(this.urlPart + 'getAllForEntityTypeAndServiceId' + params, {responseType: 'json'})
      .pipe(map(res => res));
  }

  updateOrCreateDocument(entityType, entityId, serviceId, document){

   return this.http.post(this.urlPart, {
    entityType: entityType,
    entityId: entityId,
    serviceId: serviceId,
    documentId: document.id,
    type: document.type,
    format: document.format,
    template: "-",
    price: document.price
   }).pipe(map( data => new Document(data)));
  }

  deleteDocument(entityType, entityId, serviceId, documentId){
    const params = entityType + '/' + serviceId + '/' + entityId + '/' + documentId;
        return this.http.delete(this.urlPart + params, {responseType: 'json'})
          .pipe(map(res => res));
  }

  downloadFile(): Observable<Blob> {
    return this.http.get('http://157.230.180.203/20180616_130448.JPG', {responseType: 'blob'}).pipe(map(res => res));
  }

  uploadFile(file): Observable<any> {
    const formData = new FormData();
    formData.append('uploadedfile', file);
    return this.http.post('http://157.230.180.203:80/upload.php', formData).pipe(map(res => res));
  }
}
