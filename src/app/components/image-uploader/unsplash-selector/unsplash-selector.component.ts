import { Component, OnInit } from '@angular/core';
import { UnsplashService } from '../unsplash.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-unsplash-selector',
  templateUrl: './unsplash-selector.component.html',
  styleUrls: ['./unsplash-selector.component.scss'],
})
export class UnsplashSelectorComponent implements OnInit {

  images$: Observable<any[]>;

  loading = false;

  linkSuffix = '';

  constructor(private unsplashService: UnsplashService) {
    this.linkSuffix = this.unsplashService.getAttributionLinkSuffix();
  }

  ngOnInit() {

    this.unsplashService.fetchImages();
    this.loading = true;

    this.images$ = this.unsplashService.images$.pipe(
      map((images) => images.map((image) => ({ url: image.urls.thumb, author: image.user.name, authorUrl: image.user.links.html }))),
      tap(() => {
        this.loading = false;
      })
    );
  }

  fetchImages(event: CustomEvent) {
    this.unsplashService.fetchImages(event.detail.value);
    this.loading = true;
  }

}
