import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FileUploadService } from '../../services/file-upload.service';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})

export class ConfirmModalComponent implements OnInit {
  close() {
    throw new Error('Method not implemented.');
  }
  fileIdToDelete: string = '';
  fileList: Array<any> | undefined = [];

  constructor(public dialogRef: MatDialogRef<ConfirmModalComponent>, private uploadService: FileUploadService,) {
    this.uploadService.confirm$
      .subscribe((confirm: string) =>
        this.fileIdToDelete = confirm);
    this.uploadService.fileList$
      .subscribe((fileList: Array<any>) =>
        this.fileList = fileList);
  }

  ngOnInit() {
    this.uploadService.confirm$
      .subscribe((confirm: string) =>
        this.fileIdToDelete = confirm);
    this.uploadService.fileList$
      .subscribe((fileList: Array<any>) =>
        this.fileList = fileList);
  }

  closeModal() {
    this.uploadService.setConfirm('');
    this.dialogRef.close();
  }

  confirm() {
    debugger
    let newArray: any[] = [];
    if (this.fileList)
      newArray = [...this.fileList];

    newArray = newArray && newArray.filter((ele) => ele.lastModified !== this.fileIdToDelete)
    this.uploadService.setData(newArray);

    this.uploadService.setConfirm('');

    this.dialogRef.close();
  }

}
