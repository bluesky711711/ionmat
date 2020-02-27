import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UnsplashSelectorComponent } from '../unsplash-selector/unsplash-selector.component';

import { ModalController } from '@ionic/angular';
import { ImageCropperComponent } from '../image-cropper/image-cropper.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
})
export class ImageUploaderComponent implements OnInit {

  @Input() width: number;
  @Input() height: number;

  file: File;

  croppedImageUrl: SafeUrl;

  constructor(private modalCtrl: ModalController,
              private sanitizer: DomSanitizer) { }

  ngOnInit() { }

  async onSelect(event) {
    this.file = event.addedFiles[0];
    const fileUrl = await this.readAndGetFileUrl(this.file);
    await this.openCropperModal(fileUrl);
  }

  removeSelected() {
    this.croppedImageUrl = null;
  }

  async readAndGetFileUrl(file: File): Promise<string> {

    return new Promise((resolve, reject) => {
      const fr = new FileReader();

      fr.onloadend = (loadEvent) => {
        resolve(fr.result.toString());
      };

      fr.readAsDataURL(file);
    });
  }

  async openUnsplashModal() {

    const modal = await this.modalCtrl.create({
      component: UnsplashSelectorComponent
    });

    modal.onDidDismiss().then(async (res) => {
      if (res && res.data && res.data.imageUrl) {
        const imageUrl = res.data.imageUrl;
        await this.openCropperModal(imageUrl);
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
        cropToWidth: this.width
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

}
