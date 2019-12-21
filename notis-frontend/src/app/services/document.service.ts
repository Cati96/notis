import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable(
)
export class DocumentService {

  private urlPart = 'documents/';

  constructor(private http: HttpClient) {

  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log('fired'));
  }

  getAllDocumentsForServiceId(serviceId: number): Observable<any> {
    const params = '?' + 'serviceId=' + serviceId;
    return this.http.get('http://157.230.180.203:8080/notis/test/getAllDocumentsByServiceId' + params, {responseType: 'json'})
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

  uploadDocument(document) {

  }
}
