import { Component, OnInit } from '@angular/core';
import { UnsplashService } from '../unsplash.service';

import { ModalController } from '@ionic/angular';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-unsplash-selector',
  templateUrl: './unsplash-selector.component.html',
  styleUrls: ['./unsplash-selector.component.scss'],
})
export class UnsplashSelectorComponent implements OnInit {

  images$: Observable<any[]>;

  loading = false;

  linkSuffix = '';

  thumbnails = true;

  selectedImage: any;
  selectedImageURL: string;

  slideOpts = {
    zoom: false,
    autoHeight: true,
  };

  constructor(private unsplashService: UnsplashService,
              private modalCtrl: ModalController,
              private http: HttpClient) {
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
        regularSizeUrl: image.urls.regular
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

  // async downloadImage(url: string): Promise<string> {
  //   const response = await this.http.get(url, { responseType: 'blob' }).toPromise();
  //   const urlCreator = window.URL;
  //   const imagePath = urlCreator.createObjectURL(response);
  //   return imagePath;
  // }

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
      imageUrl: this.selectedImage.regularSizeUrl
    });
  }

}
