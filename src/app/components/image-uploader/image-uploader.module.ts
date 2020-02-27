import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { UnsplashSelectorComponent } from './unsplash-selector/unsplash-selector.component';
import { MatDialogModule} from '@angular/material';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';
import { CustomImagePreviewComponent } from './custom-image-preview/custom-image-preview.component';


@NgModule({
  declarations: [ImageUploaderComponent, UnsplashSelectorComponent, ImageCropperComponent, CustomImagePreviewComponent],
  entryComponents: [UnsplashSelectorComponent, ImageCropperComponent],
  imports: [
    CommonModule,
    IonicModule,
    MatDialogModule,
    NgxDropzoneModule
  ],
  exports: [ImageUploaderComponent],
  providers: []
})
export class ImageUploaderModule { }
