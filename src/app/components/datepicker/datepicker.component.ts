<<<<<<< HEAD
import { Component, Output, EventEmitter, Input, OnInit, OnChanges, ViewChild} from '@angular/core';
import { FormGroup, FormGroupDirective, ControlContainer} from '@angular/forms';
=======
import { Component, Output, EventEmitter, Input, OnInit, OnChanges, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, ControlContainer } from '@angular/forms';
>>>>>>> 58466c88b668839e8a65107fc10af600a65d7fdf

import { MatAutocompleteTrigger } from '@angular/material';

import { TimepopoverComponent } from './timepopover/timepopover.component';

<<<<<<< HEAD
import { TimeautocompleteComponent } from './autocomplete/autocomplete.component';

import { PopoverController } from '@ionic/angular';
=======
import { PopoverController, IonDatetime, Platform } from '@ionic/angular';
>>>>>>> 58466c88b668839e8a65107fc10af600a65d7fdf

import { FormService } from './form.service';

import { parse, format, isDate } from 'date-fns';
import { Data } from 'src/app/data';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})

export class DatepickerComponent implements OnInit, OnChanges {

<<<<<<< HEAD
    pickerOpen = false;
    datetime = '';
    formattedDate = '';

    timestamp: Date;
    date: any;
    time: any;

    options: any;

    startdatetime: any;
    enddatetime: any;

    placeholder: string;

    from: any;
    to: any;
    pageoutput = '';

    timeincluded: boolean;

    public focused: boolean;

    @Input() label: string;
    @Input() form: FormGroup;
    @Input() control: string;
    @Input() value: any;

    sourceNewEvent: boolean = true;
    @Input() sourceCalendar: boolean;

    @Input() includeTime: boolean;

    @Input() datetimeFrom: boolean;
    @Input() datetimeTo: boolean;

    @Input() min: Date;
    @Input() max: Date;

    @ViewChild('trackAutoCompleteInput', { read: MatAutocompleteTrigger, static: false })
    @ViewChild(TimeautocompleteComponent, {static: false}) child;

    trackAutoCompleteInput: MatAutocompleteTrigger;

    constructor(public popoverCtrl: PopoverController,
                public forms: FormService) { }

                ngOnInit() {

                  this.options = [
                    '00:00',
                    '00:30',
                    '01:00',
                    '01:30',
                    '02:00',
                    '02:30',
                    '03:00',
                    '03:30',
                    '04:00',
                    '04:30',
                    '05:30',
                    '06:00',
                    '06:30',
                    '07:00',
                    '07:30',
                    '08:00',
                    '09:00',
                    '09:30',
                    '10:00',
                    '10:30',
                    '11:00',
                    '11:30',
                    '12:00',
                    '12:30',
                    '13:00',
                    '13:30',
                    '14:00',
                    '14:30',
                    '15:00',
                    '15:30',
                    '16:00',
                    '16:30',
                    '17:00',
                    '17:30',
                    '18:00',
                    '18:30',
                    '19:00',
                    '19:30',
                    '20:00',
                    '20:30',
                    '21:00',
                    '21:30',
                    '22:00',
                    '22:30',
                    '23:00',
                    '23:30'
                  ];


                  this.focused = false;

                  if (this.sourceNewEvent) {
                    this.from = 'DD/MM/YYYY HH:mm';
                    this.forms.newStartDate.next(this.from);
                    this.to = '';
                    this.forms.newEndDate.next(this.to);
                    this.placeholder = 'DD/MM/YYYY HH:mm';
                    }

                    else {
                    // this.from = this.data.calSessionAddObj.data.StartTime;
                    // this.to = this.data.calSessionAddObj.data.EndTime;
                    this.placeholder = 'DD/MM/YYYY HH:mm';


                    if (this.control === 'eventStartDate') {
                      const formattedresult = format(new Date(this.from), 'DD/MM/YYYY HH:mm');
                      this.time = format(new Date(this.from), 'HH:mm');
                      // Change this to first event day
                      this.max = this.from;
                      this.forms.newStartDate.next(this.from);
                      this.form.controls[this.control].setValue(this.from);
                      this.form.updateValueAndValidity();
                      this.pageoutput = formattedresult;
                      this.date = this.from;
                    } else {
                      const formattedresult = format(new Date(this.to), 'DD/MM/YYYY HH:mm');
                      this.time = format(new Date(this.to), 'HH:mm');
                      // Change this to last event day
                      this.min = this.to;
                      this.forms.newEndDate.next(this.to);
                      this.form.controls[this.control].setValue(this.to);
                      this.form.updateValueAndValidity();
                      this.pageoutput = formattedresult;
                      this.date = this.to;

                    }

                  }

                    }

                    ngOnChanges() {

                      if (this.sourceNewEvent) {
                        this.from = '';
                        this.forms.newStartDate.next(this.from);
                        this.to = '';
                        this.forms.newEndDate.next(this.to);
                        } else {

                      if (this.includeTime) {
                        this.pageoutput = format(new Date(this.date), 'DD/MM/YYYY HH:mm');
                      } else {
                        this.pageoutput = format(new Date(this.date), 'DD/MM/YYYY');
                      }

                    }
                    }

                dateEntered(date, source) {

                    // DEFINES this.date
                    // If date comes from the picker and uses time use date.value else use this.date
                    if ((source === 'picker') && this.includeTime) {
                      this.date = parse(format(date.value, 'ddd DD MMM YYYY' ) + ' ' + this.time); }
                      else if (source === 'timepicker' && this.includeTime) {
                      this.date = parse(format(this.date, 'ddd DD MMM YYYY' ) + ' ' + this.time);
                    } else if (source === 'picker' && !this.includeTime) { this.date = date.value; this.time = '00:00'; }

                    // Write logic below in to if statements above

                    if (this.time === '') {
                      if (this.includeTime) { this.pageoutput = format(new Date(this.date), 'DD/MM/YYYY HH:mm'); } else {
                        this.pageoutput = format(new Date(this.date), 'DD/MM/YYYY');
                      }
                    } else {
                      const datetime = format(this.date, 'ddd DD MMM YYYY') + ' ' + this.time;
                      this.timestamp = parse(datetime);

                      if (this.includeTime) { this.pageoutput = format(new Date(this.timestamp), 'DD/MM/YYYY HH:mm'); } else {
                        this.pageoutput = format(new Date(this.timestamp), 'DD/MM/YYYY');
                      }
                    }

                    // Writes form values

                    if (this.control === 'eventStartDate') {
                      this.forms.newStartDate.next(this.date);
                      this.form.controls[this.control].setValue(this.date);
                    }

                    if (this.control === 'eventEndDate') {
                      this.forms.newEndDate.next(this.date);
                      this.form.controls[this.control].setValue(this.date);
                    }

                  }

                focus() {
                    this.pickerOpen = !this.pickerOpen;
                    this.togglefocused();

                    if (this.control === 'eventStartDate') {
                      this.forms.newEndDate.subscribe(newdate => {
                      this.max = newdate;
                        });

                    }

                    if (this.control === 'eventEndDate') {
                      this.forms.newStartDate.subscribe(newdate => {
                      this.min = newdate;
                        });
                    }
                  }

                  togglefocused() {
                    this.focused = !this.focused;
                  }

                  searchOptions(ev) {
                    ev.stopPropagation();
                    this.triggerAutocomplete();
                  }

                  triggerAutocomplete() {
                    this.child.open();
                  }

                async timesPopover(ev: any) {
                    const popover = await this.popoverCtrl.create({
                      component:  TimepopoverComponent,
                      event: ev,
                      translucent: true,
                    });


                    popover.onDidDismiss()
                    .then(data => { if (data.data === undefined) {} else {
                      this.time = data.data;
                      console.log(this.date);
                      this.dateEntered(this.date, 'timepicker');
                    }

                });

                    return await popover.present();

                }


                }
=======
  pickerOpen = false;
  datetime = '';
  formattedDate = '';

  timestamp: Date;
  date: any;
  time: any;

  startdatetime: any;
  enddatetime: any;

  placeholder: string;

  from: any;
  to: any;
  pageoutput = '';

  timeincluded: boolean;

  public datePickerVal: Date;

  useIonDateTime: boolean = false;

  @Input() label: string;
  @Input() form: FormGroup;
  @Input() control: string;
  @Input() value: any;

  sourceNewEvent: boolean = true;
  @Input() sourceCalendar: boolean;

  @Input() includeTime: boolean;

  @Input() datetimeFrom: boolean;
  @Input() datetimeTo: boolean;

  @Input() min: Date;
  @Input() max: Date;

  @Input() color: string;

  constructor(public popoverCtrl: PopoverController,
    public forms: FormService,
    public platform: Platform) {

  }

  ngOnInit() {
    this.platform.resize.subscribe(async () => {
      let width = this.platform.width();
      //let height = this.platform.height();
      if (width < 600) {
        this.useIonDateTime = true;
      } else {
        this.useIonDateTime = false;
      }
    });

    if (!this.color || this.color == "") {
      this.color = "primary";  //Primary Color
    }

    if (this.sourceNewEvent) {
      this.from = 'DD/MM/YYYY HH:mm';
      this.forms.newStartDate.next(this.from);
      this.to = '';
      debugger;
      this.forms.newEndDate.next(this.to);
      this.placeholder = 'DD/MM/YYYY HH:mm';

      this.sourceNewEvent = false;
    } else {
      // this.from = this.data.calSessionAddObj.data.StartTime;
      // this.to = this.data.calSessionAddObj.data.EndTime;
      this.placeholder = 'DD/MM/YYYY HH:mm';

      if (this.control === 'eventStartDate') {
        const formattedresult = format(new Date(this.from), 'DD/MM/YYYY HH:mm');
        this.time = format(new Date(this.from), 'HH:mm');
        // Change this to first event day
        this.max = this.from;
        this.forms.newStartDate.next(this.from);
        this.form.controls[this.control].setValue(this.from);
        this.form.updateValueAndValidity();
        this.pageoutput = formattedresult;
        this.date = this.from;
      } else {
        const formattedresult = format(new Date(this.to), 'DD/MM/YYYY HH:mm');
        this.time = format(new Date(this.to), 'HH:mm');
        // Change this to last event day
        this.min = this.to;
        debugger;
        this.forms.newEndDate.next(this.to);
        this.form.controls[this.control].setValue(this.to);
        this.form.updateValueAndValidity();
        this.pageoutput = formattedresult;
        this.date = this.to;
      }
    }
  }

  ngOnChanges(event) {
    debugger;
    if ((!event.max && !event.min) || event.includeTime) {
      this.time = this.time === undefined ? '00:00' : this.time;

      if (this.date) {
        if (this.includeTime) {
          this.pageoutput = format(new Date(this.date), 'DD/MM/YYYY HH:mm');
        } else {
          this.pageoutput = format(new Date(this.date), 'DD/MM/YYYY');
        }
      }

      if (this.sourceNewEvent) {
        this.from = '';
        this.forms.newStartDate.next(this.from);
        this.to = '';
        debugger;
        this.forms.newEndDate.next(this.to);
      } else {
        if (this.includeTime) {
          this.pageoutput = format(new Date(this.date), 'DD/MM/YYYY HH:mm');
        } else {
          this.pageoutput = format(new Date(this.date), 'DD/MM/YYYY');
        }

        this.dateEntered(this.date, 'self');
      }
    }
  }

  dateEntered(date, source) {
    debugger;
    // DEFINES this.date
    // If date comes from the picker and uses time use date.value else use this.date    

    this.time = this.time === undefined ? '00:00' : this.time;

    if (!this.date) {
      this.date = new Date();
    }

    if (!date) {
      date = new Date();
    }

    if (source === 'picker' && this.includeTime) {
      this.date = parse(format(date.value, 'ddd DD MMM YYYY') + ' ' + this.time);
    } else if (source === 'picker' && !this.includeTime) {
      this.date = date.value; this.time = '00:00';
    } else if (source === 'timepicker' && this.includeTime) {
      this.date = parse(format(date, 'ddd DD MMM YYYY') + ' ' + this.time);
    } else if (source === 'self' && this.includeTime) {
      this.date = parse(format(date, 'ddd DD MMM YYYY') + ' ' + this.time);
    } else if (source === 'self' && !this.includeTime) {
      this.time = '00:00';
    } else if (source === 'newpicker' && this.includeTime) {
      this.date = parse(format(date.detail.value, 'ddd DD MMM YYYY') + ' ' + this.time);
    } else if (source === 'newpicker' && !this.includeTime) {
      this.date = date.detail.value; this.time = '00:00';
    }

    // Write logic below in to if statements above

    if (this.time === '') {
      if (this.includeTime) { this.pageoutput = format(new Date(this.date), 'DD/MM/YYYY HH:mm'); } else {
        this.pageoutput = format(new Date(this.date), 'DD/MM/YYYY');
      }
    } else {
      const datetime = format(this.date, 'ddd DD MMM YYYY') + ' ' + this.time;
      this.timestamp = parse(datetime);

      if (this.includeTime) { this.pageoutput = format(new Date(this.timestamp), 'DD/MM/YYYY HH:mm'); } else {
        this.pageoutput = format(new Date(this.timestamp), 'DD/MM/YYYY');
      }
    }

    // Writes form values

    debugger;
    if (!this.includeTime) {
      this.date.setHours(0);
    }

    if (this.control === 'eventStartDate') {
      this.forms.newStartDate.next(this.date);
      this.form.controls[this.control].setValue(this.date);

      Data.startDateVal = this.date;
    }

    if (this.control === 'eventEndDate') {
      this.forms.newEndDate.next(this.date);
      this.form.controls[this.control].setValue(this.date);

      Data.endDateVal = this.date;
    }

    if (this.includeTime && Data.startDateVal && Data.endDateVal && ((new Date(Data.startDateVal.toDateString())) >= (new Date(Data.endDateVal.toDateString()))) && (Data.startTimeVal == 0 || Data.endTimeVal == 0 || Data.startTimeVal >= Data.endTimeVal)) {
      if (this.control === 'eventStartDate') {
        if (Data.endDateVal < this.date) {
          this.date = new Date(Data.endDateVal.toDateString());
        }

        if (Data.endTimeVal - 2 < 0) {
          let dt: Date = this.date;
          dt.setDate(Data.endDateVal.getDate() - 1);
          this.date = dt;
          Data.startDateVal = this.date;

          let timeObj = Data.times[Data.times.length - 1];
          this.time = timeObj[1];
          Data.startTimeVal = parseInt(timeObj[0].toString());
        } else {
          let timeObj = Data.times[Data.endTimeVal - 2];
          this.time = timeObj[1];
          Data.startTimeVal = parseInt(timeObj[0].toString());
        }
      } else if (this.control === 'eventEndDate') {
        if (Data.startDateVal > this.date) {
          this.date = new Date(Data.startDateVal.toDateString());
        }

        if (Data.startTimeVal == Data.times.length) {
          let dt: Date = this.date;
          dt.setDate(Data.startDateVal.getDate() + 1);
          this.date = dt;
          Data.endDateVal = this.date;

          let timeObj = Data.times[0];
          this.time = timeObj[1];
          Data.endTimeVal = parseInt(timeObj[0].toString());
        } else {
          let index = Data.startTimeVal;
          if (Data.startTimeVal == 0) {
            Data.startTimeVal = 1;
            index = 1;
          }
          let timeObj = Data.times[index];
          this.time = timeObj[1];
          Data.endTimeVal = parseInt(timeObj[0].toString());
        }
      }

      this.datePickerVal = this.date;
      let that = this;
      setTimeout(x => {
        that.dateEntered(this.date, 'self');
      }, 1000);
    } else if (!this.includeTime && Data.startDateVal && Data.endDateVal && ((new Date(Data.startDateVal.toDateString())) >= (new Date(Data.endDateVal.toDateString())))) {
      Data.startTimeVal = 0;
      Data.endTimeVal = 0;

      if (this.control === 'eventStartDate') {
        let dt: Date = this.date;
        dt.setDate(Data.endDateVal.getDate() - 1);
        this.date = dt;
        Data.startDateVal = this.date;
      } else if (this.control === 'eventEndDate') {
        let dt: Date = this.date;
        dt.setDate(Data.startDateVal.getDate() + 1);
        this.date = dt;
        Data.endDateVal = this.date;
      }

      this.datePickerVal = this.date;
      let that = this;
      setTimeout(x => {
        that.dateEntered(this.date, 'self');
      }, 1000);
    }

    if (this.useIonDateTime) {
      this.focus();
    }
  }

  focus() {
    debugger;
    this.pickerOpen = !this.pickerOpen;

    if (this.control === 'eventStartDate') {
      this.forms.newEndDate.subscribe(newdate => {
        this.max = newdate;
      });
    }

    if (this.control === 'eventEndDate') {
      this.forms.newStartDate.subscribe(newdate => {
        this.min = newdate;
      });
    }
  }

  async timesPopover(ev: any) {
    debugger;
    const popover = await this.popoverCtrl.create({
      component: TimepopoverComponent,
      componentProps: { control: this.control },
      event: ev,
      translucent: true,
    });


    popover.onDidDismiss()
      .then(data => {
        debugger;
        if (data.data === undefined) { } else {
          let timeObj = data.data;
          this.timeSetEvent(timeObj);
        }
      });

    return await popover.present();
  }

  public timeSetEvent(timeObj: any) {
    debugger;
    this.time = timeObj[1];

    if (this.control == 'eventStartDate') {
      Data.startTimeVal = timeObj[0];
    } else if (this.control == 'eventEndDate') {
      Data.endTimeVal = timeObj[0];
    }

    console.log(this.date);
    this.dateEntered(this.date, 'self');
  }

  public getFormattedDate(inputDate: any, isMin: boolean) {
    if (inputDate != undefined && inputDate != '' && isDate(inputDate)) {
      let dt = inputDate.getDate();
      let dtStr = "";
      if (dt < 10) {
        dtStr = "0" + dt.toString();
      } else {
        dtStr = dt.toString();
      }
      return ((inputDate.getFullYear()).toString() + "-" + (inputDate.getMonth() + 1).toString() + "-" + dtStr);
    } else {
      let tdy = new Date();
      if (!isMin) {
        return (tdy.getFullYear()).toString();
      } else {
        return (tdy.getFullYear() - 100).toString();
      }
    }
  }
}
>>>>>>> 58466c88b668839e8a65107fc10af600a65d7fdf
