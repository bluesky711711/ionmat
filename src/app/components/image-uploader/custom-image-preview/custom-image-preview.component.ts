import { Component, OnInit, Input } from '@angular/core';
import { NgxDropzonePreviewComponent } from 'ngx-dropzone';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-custom-image-preview',
  templateUrl: './custom-image-preview.component.html',
  styleUrls: ['./custom-image-preview.component.scss'],
  providers: [
    {
      provide: NgxDropzonePreviewComponent,
      useExisting: CustomImagePreviewComponent
    }
  ]
})
export class CustomImagePreviewComponent extends NgxDropzonePreviewComponent implements OnInit {

  @Input() imageURL = '';

  constructor(
    sanitizer: DomSanitizer
  ) {
    super(sanitizer);
  }

  ngOnInit() {
    if (!this.imageURL) {
      console.error('No image to show. Please provide an image url property.');
      return;
    }
  }

}
