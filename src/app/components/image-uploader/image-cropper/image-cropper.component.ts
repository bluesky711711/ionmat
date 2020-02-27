import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import * as Croppie from 'croppie';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss'],
})
export class ImageCropperComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('cropDiv', { static: true }) cropDiv: ElementRef;

  @Input() imageToCrop;
  @Input() cropToHeight;
  @Input() cropToWidth;

  croppedImage;

  outputOptions;

  cropper: Croppie;

  constructor(private modalCtrl: ModalController, private cd: ChangeDetectorRef) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.cropper = new Croppie(this.cropDiv.nativeElement, this.getCroppieOptions());
    this.outputOptions = { type: 'blob', size: { width: this.cropToWidth, height: this.cropToHeight }, format: 'jpeg', quality: 0.8 };

    this.cd.detectChanges();

    setTimeout(() => {
      this.cropper.bind({ url: this.imageToCrop }).then(response => {
        this.cropper.setZoom(0.5);
      });
    }, 500);
  }

  getCroppieOptions(): any {
    const opts: any = {};

    if (this.cropToHeight && this.cropToWidth) {

      const aspectRatio = (this.cropToHeight * 1.0) / this.cropToWidth;
      const viewportWidth = 300;
      const viewportHeight = 300 * aspectRatio;

      opts.viewport = {
        width: viewportWidth,
        height: viewportHeight
      };

      opts.boundary = {
        width: viewportWidth + 100,
        height: viewportHeight + 100,
      };
    } else {
      opts.viewport = {
        width: parseInt('200', 10),
        height: parseInt('200', 10)
      };

      opts.boundary = {
        width: parseInt('300', 10),
        height: parseInt('300', 10),
      };

      opts.enableResize = true;
    }

    // opts.enforceBoundary = true;
    return opts;
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  finalizeCrop() {
    this.cropper.result(this.outputOptions).then((blob) => {
      this.modalCtrl.dismiss({
        croppedImageBlob: blob
      });
    });
  }

  ngOnDestroy() {
    if (this.cropper) {
      this.cropper.destroy();
    }
  }

}
