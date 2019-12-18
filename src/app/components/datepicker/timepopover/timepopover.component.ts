import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { Data } from 'src/app/data';

@Component({
  selector: 'app-timepopover',
  templateUrl: './timepopover.component.html',
  styleUrls: ['./timepopover.component.scss'],
})
export class TimepopoverComponent implements OnInit {

  public times;
  public startTimeVal: number;
  public endTimeVal: number;
  public startDateVal: Date;
  public endDateVal: Date;
  public control: string;

  constructor(public popCtrl: PopoverController, private navParams: NavParams) {
    this.control = this.navParams.get('control');
  }

  ngOnInit() {
    this.startTimeVal = Data.startTimeVal;
    this.endTimeVal = Data.endTimeVal;
    this.startDateVal = Data.startDateVal;
    this.endDateVal = Data.endDateVal;
    this.times = Data.times;
  }

  public check(time: any) {
    if (this.startDateVal == undefined || this.endDateVal == undefined || this.startDateVal.toDateString() == this.endDateVal.toDateString()) {
      if (this.control == "eventEndDate") {
        if (this.startTimeVal == 0) {
          return true;
        } else {
          if (time[0] > this.startTimeVal) {
            return true;
          }
        }
      } else if (this.control == "eventStartDate") {
        if (this.endTimeVal == 0) {
          return true;
        } else {
          if (time[0] < this.endTimeVal) {
            return true;
          }
        }
      }
    } else {
      return true;
    }

    return false;
  }

  async setTime(time) {
    await this.popCtrl.dismiss(time);
  }
}
