import { Component, OnInit } from '@angular/core';

import { AppstatusService } from '../services/appstatus.service';

import 'custom-color-generator';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.page.html',
  styleUrls: ['./colors.page.scss'],
})
export class ColorsPage implements OnInit {

  public breakpoint: string;
  public width: number;

  public fixed: boolean;

  constructor(public appStatus: AppstatusService) { }

  ngOnInit() {
    this.appStatus.newBreakpoint.subscribe(data => {
      this.breakpoint = data;
      });

    this.appStatus.newWidth.subscribe(data => {
        this.width = data;
      });

    this.appStatus.newFixed.subscribe(data => {
        this.fixed = data;
      });
  }

}
