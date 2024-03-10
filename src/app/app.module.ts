import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { UploadImagesComponent } from './components/upload-images/upload-images.component';

import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {WebcamModule} from 'ngx-webcam';
import {Dialog, DialogRef, DIALOG_DATA, DialogModule} from '@angular/cdk/dialog';
import {FormsModule} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent as ModalComponent } from '../app/components/modal/modal.component';
import {MatIconModule} from '@angular/material/icon';
import { ConfirmModalComponent } from '../app/components/confirm-modal/confirm-modal.component';

const materialModules = [
  MatCardModule,
  MatToolbarModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatProgressBarModule,
  MatGridListModule,
  MatMenuModule,
  WebcamModule,
  FormsModule, DialogModule,MatDialogModule
];

@NgModule({
  declarations: [AppComponent, UploadImagesComponent,ModalComponent,ConfirmModalComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    NoopAnimationsModule,
    ...materialModules,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}