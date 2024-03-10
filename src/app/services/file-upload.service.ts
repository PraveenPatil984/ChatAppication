import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }

  private fileList: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  fileList$: Observable<Array<any>> = this.fileList.asObservable();

  setData(updatedData: Array<any>) {
    this.fileList.next(updatedData);
  }

  private confirm: BehaviorSubject<string> = new BehaviorSubject<string>('');
  confirm$: Observable<string> = this.confirm.asObservable();

  setConfirm(updatedData: string) {
    this.confirm.next(updatedData);
  }

  setWebCamData(updatedData: Array<any>) {
    debugger
    console.log("shg", this.fileList.value)
    this.fileList.next([...this.fileList.value, ...updatedData]);
  }

}