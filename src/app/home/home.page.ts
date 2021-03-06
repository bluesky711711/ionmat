import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';

import { ModalController } from '@ionic/angular';

import { DataService } from '../services/data.service';

import { HomemodalPage } from '../homemodal/homemodal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  options: any;
  public allday: boolean;

  form: FormGroup;

  public chipsConfig: object = {
    label: 'Chips',
    display_field: 'name',
    editpagetarget: 'target',
    color: 'primary',
    editlabel: 'Manage Chips',
    maxChips: 1
  };

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
      console.log(this.options);
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

  async loadModal() {
    const modal = await this.modalCtrl.create({
      component: HomemodalPage
    });
    return await modal.present();

  }
}
