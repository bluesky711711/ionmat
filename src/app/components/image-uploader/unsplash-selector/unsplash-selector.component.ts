import { Component, OnInit } from '@angular/core';
import { UnsplashService } from '../unsplash.service';

import { ModalController } from '@ionic/angular';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UnsplashImage } from '../models/image-uploader.model';

@Component({
  selector: 'app-unsplash-selector',
  templateUrl: './unsplash-selector.component.html',
  styleUrls: ['./unsplash-selector.component.scss'],
})
export class UnsplashSelectorComponent implements OnInit {

  images$: Observable<UnsplashImage[]>;

  loading = false;

  linkSuffix = '';

  thumbnails = true;

  selectedImage: UnsplashImage;
  selectedImageURL: string;

  slideOpts = {
    zoom: false,
    autoHeight: true,
  };

  constructor(private unsplashService: UnsplashService,
              private modalCtrl: ModalController) {
    this.linkSuffix = this.unsplashService.getAttributionLinkSuffix();
  }

  ngOnInit() {

    this.unsplashService.fetchImages();
    this.loading = true;

    this.images$ = this.unsplashService.images$.pipe(
      map((images) => images.map((image) => ({
        thumbUrl: image.urls.thumb,
        author: image.user.name,
        authorUrl: image.user.links.html,
        fullSizeUrl: image.urls.full,
        width: image.width,
        height: image.height
      }))),
      tap(() => {
        this.loading = false;
      })
    );
  }

  fetchImages(event: CustomEvent) {
    this.unsplashService.fetchImages(event.detail.value);
    this.loading = true;
  }

  async dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true,
    });
  }

  getImage(image) {
    console.log(image);
    this.selectedImage = image;
    this.selectedImageURL = image.thumbUrl;
    this.thumbnails = !this.thumbnails;
  }

  toggleThumbnails() {
    this.thumbnails = !this.thumbnails;
  }

  selectImageAndDismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
      selectedImage: this.selectedImage
    });
  }

}
