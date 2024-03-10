import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FileUploadService } from '../../services/file-upload.service';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit {
  fileList: Array<any> | undefined = [];

  public webcamImage: WebcamImage | undefined;
  private trigger: Subject<void> = new Subject<void>();
  sysImage: string | undefined | any;
  constructor(public dialogRef: MatDialogRef<ModalComponent>, private uploadService: FileUploadService,) {
    this.uploadService.fileList$
      .subscribe((fileList: Array<any>) =>
        this.fileList = fileList);
  }

  ngOnInit() {
    this.uploadService.fileList$
      .subscribe((fileList: Array<any>) =>
        this.fileList = fileList);
  }

 
  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  closeModal() {
    this.dialogRef.close();
  }

  triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleImage(webcamImage: WebcamImage): void {
    debugger
    this.webcamImage = webcamImage;

    this.sysImage = webcamImage!.imageAsDataUrl;
    console.info('got webcam image', this.sysImage);
    const data = {
      lastModified: new Date().valueOf(),
      imageAsDataUrl: webcamImage!.imageAsDataUrl
    }
    if (this.fileList && this.fileList?.length >= 6) {
      alert("Only 6 Photos are allowed to add!")
    }
    else
      this.uploadService.setWebCamData([data])

  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

}
