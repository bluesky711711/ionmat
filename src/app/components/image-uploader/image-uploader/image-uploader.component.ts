import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UnsplashSelectorComponent } from '../unsplash-selector/unsplash-selector.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
})
export class ImageUploaderComponent implements OnInit {

  files: File[] = [];

  constructor(private dialog: MatDialog) { }

  ngOnInit() { }

  onSelect(event) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  openUnsplashModal() {
    const dialogRef = this.dialog.open(UnsplashSelectorComponent,
      {
        width: '500px'
      });

    dialogRef.afterClosed().pipe(filter(val => !!val)).subscribe((value) => {
      console.log(value);
    });
  }


}
