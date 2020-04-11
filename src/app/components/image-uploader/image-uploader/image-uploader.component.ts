import { Component, OnInit, Input } from '@angular/core';
import { UnsplashSelectorComponent } from '../unsplash-selector/unsplash-selector.component';

import { ModalController, AlertController } from '@ionic/angular';
import { ImageCropperComponent } from '../image-cropper/image-cropper.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileImage, UnsplashImage } from '../models/image-uploader.model';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
})
export class ImageUploaderComponent implements OnInit {

  @Input() width: number;
  @Input() height: number;
  @Input() type = 'square';

  file: File;

  croppedImageUrl: SafeUrl;

  constructor(private modalCtrl: ModalController,
              private sanitizer: DomSanitizer,
              private alertCtrl: AlertController) { }

  ngOnInit() { }

  async onSelect(event) {
    this.file = event.addedFiles[0];
    console.log('this.file');
    console.log(this.file);
    const fileImage = await this.readAndGetFileImage(this.file);
    console.log(fileImage.imageUrl);
    if (this.checkImageDimensions(fileImage.width, fileImage.height)) {
      await this.openCropperModal(fileImage.imageUrl);
    }
  }

  removeSelected() {
    this.croppedImageUrl = null;
  }

  async readAndGetFileImage(file: File): Promise<FileImage> {

    return new Promise((resolve, reject) => {
      const fr = new FileReader();

      fr.onloadend = (loadEvent) => {
        const fileImageUrl = fr.result.toString();
        const image = new Image();
        image.src = fileImageUrl;
        image.onload = () => {
          resolve({
            imageUrl: fileImageUrl,
            width: image.width,
            height: image.height
          });
        };
      };

      fr.readAsDataURL(file);
    });
  }

  async openUnsplashModal() {

    const modal = await this.modalCtrl.create({
      component: UnsplashSelectorComponent
    });

    modal.onDidDismiss().then(async (res) => {
      if (res.data && res.data.selectedImage) {
        const unsplashImage: UnsplashImage = res.data.selectedImage;
        if (this.checkImageDimensions(unsplashImage.width, unsplashImage.height)) {
          await this.openCropperModal(unsplashImage.fullSizeUrl);
        }
      }
    });

    return await modal.present();

  }

  async openCropperModal(imageUrl: string) {
    const modal = await this.modalCtrl.create({
      component: ImageCropperComponent,
      componentProps: {
        imageToCrop: imageUrl,
        cropToHeight: this.height,
        cropToWidth: this.width,
        type: this.type
      }
    });

    modal.onDidDismiss().then((res) => {
      if (res && res.data && res.data.croppedImageBlob) {
        const imgBlob = res.data.croppedImageBlob;
        const urlCreator = window.URL;
        this.croppedImageUrl = this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(imgBlob));
      }
    });

    return await modal.present();
  }

  checkImageDimensions(imageWidth: number, imageHeight: number) {
    if (this.width > imageWidth || this.height > imageHeight) {
      this.showInvalidDimensionsAlert();
      return false;
    } else {
      return true;
    }
  }

  async showInvalidDimensionsAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Invalid image sizes',
      subHeader: 'Image cant be cropped to these sizes',
      message: 'Please choose a different image or modify the dimensions needed.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
