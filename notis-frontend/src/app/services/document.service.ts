import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {baseUrl} from '../core/global';

@Injectable(
)
export class DocumentService {

  private urlPart = baseUrl + 'documents/';

  constructor(private http: HttpClient) {

  }

  getAllDocumentsForEntityTypeServiceId(entityType, serviceId: number): Observable<any> {
    const params = '?entityType=' + entityType + '&serviceId=' + serviceId;
    return this.http.get(this.urlPart + 'getAllForEntityTypeAndServiceId' + params, {responseType: 'json'})
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
