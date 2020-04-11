import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';

import { ModalController, IonSlides } from '@ionic/angular';

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-homemodal',
  templateUrl: './homemodal.page.html',
  styleUrls: ['./homemodal.page.scss'],
})
export class HomemodalPage implements OnInit {

  options: any;
  public allday: boolean;

  form: FormGroup;

  public chipsConfig: object = {
    label: 'Chips',
    display_field: 'name',
    editpagetarget: 'target',
    color: 'primary',
    editlabel: 'Manage Chips'
  };

  @ViewChild('slides') slides: IonSlides;

  constructor(private formBuilder: FormBuilder, private data: DataService, private modalCtrl: ModalController) {
    this.form = this.formBuilder.group({
      eventStartDate: [''],
      eventEndDate: [''],
      chip_option: ['']
    });
  }

  ngOnInit() {
    this.data.getData().subscribe(data => {
      this.options = data;
    });
    this.allday = false;
  }

  allDayToggle(ev) {
    this.allday = ev.detail.checked;
  }

  public Date(date: string) {
    let dt = new Date(date);
    return dt;
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  next() {
    this.slides.slideNext();
  }

  back() {
    this.slides.slidePrev();
  }

}
