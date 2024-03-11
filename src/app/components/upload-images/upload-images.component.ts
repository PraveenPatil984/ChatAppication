import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.css']
})
export class UploadImagesComponent implements OnInit {
  selectedFiles?: FileList | any = [];
  selectedFiles1?: FileList | any = [];
  selectedFileNames: string[] = [];

  previews: any[] = [];

  fileList: Array<any> | undefined = [];

  constructor(private uploadService: FileUploadService, public matDialog: MatDialog) {
    this.uploadService.fileList$
      .subscribe((fileList: Array<any>) =>
        this.fileList = fileList);
  }

  ngOnInit() {
    this.uploadService.fileList$
      .subscribe((fileList: Array<any>) => {
        this.fileList = fileList;
        this.previews = [];
        if (fileList.length > 0) {
          const numberOfFiles = fileList.length;
          for (let i = 0; i < numberOfFiles; i++) {
            if (fileList[i] && fileList[i].imageAsDataUrl) {
              const obj = {
                preview: fileList[i].imageAsDataUrl,
                lastModified: fileList[i].lastModified
              }
              this.previews.push(obj);
            }
            else {
              const reader = new FileReader();
              reader.onload = (e: any) => {
                console.log(e.target.result);
                const obj = {
                  preview: e.target.result,
                  lastModified: fileList[i].lastModified
                }
                this.previews.push(obj);
              };
              reader.readAsDataURL(fileList[i]);
              this.selectedFileNames.push(fileList[i].name);
            }
          }
        }

      });

  }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";

    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }

  openConfirmModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "200px";
    dialogConfig.width = "400px";

    const modalDialog = this.matDialog.open(ConfirmModalComponent, dialogConfig);
  }


  selectFiles(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFiles = event.target.files;
      this.selectedFiles1 = this.fileList;
      if ([...this.selectedFiles, ...this.selectedFiles1].length > 6) {
        alert("Only 6 Photos are allowed to add!")
      }
      else {
        if (this.selectedFiles.length > 0 && this.selectedFiles1.length > 0)
          this.uploadService.setData([...this.selectedFiles, ...this.selectedFiles1]);
        else
          this.uploadService.setData(this.selectedFiles);
      }
    }
  }

  deleteImage = (fileIdToDelete: any) => {
    this.uploadService.setConfirm(fileIdToDelete);
    this.openConfirmModal();

  }

}