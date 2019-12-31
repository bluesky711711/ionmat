import { Component, Output, EventEmitter, Input, OnInit, OnChanges, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, ControlContainer } from '@angular/forms';

import { MatAutocompleteTrigger } from '@angular/material';

import { TimepopoverComponent } from './timepopover/timepopover.component';

import { TimeautocompleteComponent } from './autocomplete/autocomplete.component';

import { PopoverController, IonDatetime, Platform } from '@ionic/angular';

import { FormService } from './form.service';

import { parse, format, isDate } from 'date-fns';
import { Data } from 'src/app/data';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})

export class DatepickerComponent implements OnInit, OnChanges {
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
  isMobile: boolean = false;

  public datePickerVal: Date;
  public focused: boolean;
  useIonDateTime: boolean = false;

  dateTimeVal = '';
  ionDisplayFormat: string = "DD/MM/YYYY HH:mm";
  ionMin: string;
  ionMax: string;
  hourValues: number[] = Data.hourValues;
  minuteValues: number[] = Data.minuteValues;

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
  @ViewChild(TimeautocompleteComponent, { static: false }) child;
  @Input() color: string;
  trackAutoCompleteInput: MatAutocompleteTrigger;

  constructor(public popoverCtrl: PopoverController,
    public forms: FormService,
    public platform: Platform) {

  }

  ngOnInit() {
    this.isMobile = this.platform.is('ios') || this.platform.is('android');
    if (this.isMobile) {
      this.useIonDateTime = true;
    } else {
      this.useIonDateTime = false;
    }

    if (this.includeTime) {
      this.ionDisplayFormat = "DD/MM/YYYY HH:mm";
      this.placeholder = "DD/MM/YYYY HH:mm";
    } else {
      this.ionDisplayFormat = "DD/MM/YYYY";
      this.placeholder = "DD/MM/YYYY";
    }

    //this.useIonDateTime = true;  ////////////////////////PLEASE COMMENT THIS LINE//////////IT'S JUST FOR TESTING

    // this.platform.resize.subscribe(async () => {
    //   let width = this.platform.width();
    //   //let height = this.platform.height();
    //   if (this.isMobile) {
    //     this.useIonDateTime = true;
    //   } else if (width < 600) {
    //     this.useIonDateTime = true;
    //   } else {
    //     this.useIonDateTime = false;
    //   }
    // });

    this.focused = false;

    if (!this.color || this.color == "") {
      this.color = "primary";  //Primary Color
    }

    if (this.sourceNewEvent) {
      this.from = 'DD/MM/YYYY HH:mm';
      this.forms.newStartDate.next(this.from);
      this.to = '';

      this.forms.newEndDate.next(this.to);

      this.sourceNewEvent = false;
    } else {
      // this.from = this.data.calSessionAddObj.data.StartTime;
      // this.to = this.data.calSessionAddObj.data.EndTime;

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

    this.ionMin = this.getFormattedDate(this.min, true);
    this.ionMax = this.getFormattedDate(this.max, false);
  }

  ngOnChanges(event) {

    if (this.includeTime) {
      this.ionDisplayFormat = "DD/MM/YYYY HH:mm";
      this.placeholder = "DD/MM/YYYY HH:mm";
    } else {
      this.ionDisplayFormat = "DD/MM/YYYY";
      this.placeholder = "DD/MM/YYYY";
    }

    if (!this.useIonDateTime) {
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

          this.forms.newEndDate.next(this.to);
        } else {
          if (this.includeTime) {
            this.pageoutput = format(new Date(this.date), 'DD/MM/YYYY HH:mm');
          } else {
            this.pageoutput = format(new Date(this.date), 'DD/MM/YYYY');
          }


          this.dateEntered(this.date, 'self');

          // if (Data.startDateVal != undefined) {
          //   this.dateEntered(this.date, 'self');
          // } else if (Data.endDateVal != undefined) {
          //   this.dateEntered(Data.endDateVal, 'self');
          // }
        }
      }
    } else {
      if (!this.includeTime) {
        if (Data.startDateTimeVal != undefined) {
          Data.startDateTimeVal = new Date(format(Data.startDateTimeVal, 'MM/DD/YYYY'));
          Data.startDateTimeVal.setHours(0);
          Data.startDateTimeVal.setMinutes(0);
          console.log(Data.startDateTimeVal);
          this.ionDateEntered(Data.startDateTimeVal, 'self');
        } else if (Data.endDateTimeVal != undefined) {
          Data.endDateTimeVal = new Date(format(Data.endDateTimeVal, 'MM/DD/YYYY'));
          Data.endDateTimeVal.setHours(0);
          Data.endDateTimeVal.setMinutes(0);
          console.log(Data.endDateTimeVal);
          this.ionDateEntered(Data.endDateTimeVal, 'self');
        }
      }
    }
  }

  ionDateEntered(event, eventType: string) {

    let that = this;

    let ddmmFormat = "DD/MM/YYYY";
    let mmddFormat = "MM/DD/YYYY";

    let ddmmFormatWoTime = "DD/MM/YYYY";
    let mmddFormatWoTime = "MM/DD/YYYY";

    if (this.includeTime) {
      ddmmFormat = "DD/MM/YYYY HH:mm";
      mmddFormat = "MM/DD/YYYY HH:mm";
    }

    let selectedDateTime: Date;
    if (eventType == 'self') {
      selectedDateTime = event;
    } else {
      selectedDateTime = parse(event.detail.value);
    }

    let formattedSelectedDateTimeStr = format(selectedDateTime, ddmmFormat);
    let formattedSelectedDateStr = format(selectedDateTime, ddmmFormatWoTime);
    let formattedSelectedDate = format(selectedDateTime, ddmmFormat);

    if (this.control === 'eventStartDate') {
      Data.startDateTimeVal = selectedDateTime;

      let formattedEndDateTimeStr = format(Data.endDateTimeVal, ddmmFormat);
      let formattedEndDateStr = format(Data.endDateTimeVal, ddmmFormatWoTime);
      let formattedEndDateTime = new Date(format(Data.endDateTimeVal, mmddFormat));

      if (formattedSelectedDateStr == formattedEndDateStr) {
        if (this.includeTime) {
          let selectedHours: number = selectedDateTime.getHours();
          let selectedMinutes: number = selectedDateTime.getMinutes();

          let endDtHrs: number = Data.endDateTimeVal.getHours();
          let endDtMins: number = Data.endDateTimeVal.getMinutes();

          if (selectedHours >= endDtHrs || (selectedHours == endDtHrs && selectedMinutes >= endDtMins)) {
            if (selectedHours == endDtHrs && selectedMinutes == endDtMins && selectedHours == 0 && selectedMinutes == 0) {
              //selectedDateTime.setDate(selectedDateTime.getDate() - 1);
              selectedDateTime = Data.datePlusOrMinusOne(new Date(format(selectedDateTime, 'MM/DD/YYYY')), 'MM/DD/YYYY', false);
              selectedDateTime.setHours(23);
              selectedDateTime.setMinutes(30);
            } else {
              if (selectedHours > endDtHrs) {
                if (endDtMins == 30) {
                  selectedDateTime.setHours(endDtHrs);
                  selectedDateTime.setMinutes(0);
                } else if (endDtMins == 0) {
                  selectedDateTime.setHours(endDtHrs - 1);
                  selectedDateTime.setMinutes(30);
                }
              } else if (selectedHours == endDtHrs) {
                if (selectedMinutes == endDtMins) {
                  if (endDtMins == 30) {
                    selectedDateTime.setMinutes(0);
                  } else if (endDtMins == 0) {
                    selectedDateTime.setHours(endDtHrs - 1);
                    selectedDateTime.setMinutes(30);
                  }
                }
              }

              // if (selectedMinutes == 0) {
              //   selectedDateTime.setHours(selectedHours - 1);
              //   selectedDateTime.setMinutes(30);
              // } else if (selectedMinutes == 30) {
              //   selectedDateTime.setMinutes(0);
              // }
            }
          }
        } else {
          //selectedDateTime.setDate(selectedDateTime.getDate() - 1);
          selectedDateTime = Data.datePlusOrMinusOne(new Date(format(selectedDateTime, 'MM/DD/YYYY')), 'MM/DD/YYYY', false);
          selectedDateTime.setHours(0);
          selectedDateTime.setMinutes(0);
        }

        setTimeout(x => {
          that.dateTimeVal = format(selectedDateTime, mmddFormat);
          Data.startDateTimeVal = new Date(that.dateTimeVal);
        }, 1);
      } else {
        setTimeout(x => {
          that.dateTimeVal = format(selectedDateTime, mmddFormat);
          Data.startDateTimeVal = new Date(that.dateTimeVal);
        }, 1);
      }
    } else if (this.control === 'eventEndDate') {
      Data.endDateTimeVal = selectedDateTime;

      let formattedStartDateTimeStr = format(Data.startDateTimeVal, ddmmFormat);
      let formattedStartDateStr = format(Data.startDateTimeVal, ddmmFormatWoTime);
      let formattedStartDateTime = new Date(format(Data.startDateTimeVal, mmddFormat));

      if (formattedSelectedDateStr == formattedStartDateStr) {
        if (this.includeTime) {
          let selectedHours: number = selectedDateTime.getHours();
          let selectedMinutes: number = selectedDateTime.getMinutes();

          let startDtHrs: number = Data.startDateTimeVal.getHours();
          let startDtMins: number = Data.startDateTimeVal.getMinutes();

          if (selectedHours <= startDtHrs || (selectedHours == startDtHrs && selectedMinutes <= startDtMins)) {
            if (selectedHours == startDtHrs && selectedMinutes == startDtMins && selectedHours == 23 && selectedMinutes == 30) {
              //selectedDateTime.setDate(selectedDateTime.getDate() + 1);
              selectedDateTime = Data.datePlusOrMinusOne(new Date(format(selectedDateTime, 'MM/DD/YYYY')), 'MM/DD/YYYY', true);
              selectedDateTime.setHours(0);
              selectedDateTime.setMinutes(0);
            } else {
              if (selectedHours < startDtHrs) {
                if (startDtMins == 0) {
                  selectedDateTime.setHours(startDtHrs);
                  selectedDateTime.setMinutes(30);
                } else if (startDtMins == 30) {
                  selectedDateTime.setHours(startDtHrs + 1);
                  selectedDateTime.setMinutes(0);
                }
              } else if (selectedHours == startDtHrs) {
                if (selectedMinutes == startDtMins) {
                  if (startDtMins == 0) {
                    selectedDateTime.setMinutes(30);
                  } else if (startDtMins == 30) {
                    selectedDateTime.setHours(startDtHrs + 1);
                    selectedDateTime.setMinutes(0);
                  }
                }
              }

              // if (selectedMinutes == 0) {
              //   selectedDateTime.setMinutes(30);
              // } else if (selectedMinutes == 30) {
              //   selectedDateTime.setHours(selectedHours + 1);
              //   selectedDateTime.setMinutes(0);
              // }
            }
          }
        } else {
          //selectedDateTime.setDate(selectedDateTime.getDate() + 1);
          selectedDateTime = Data.datePlusOrMinusOne(new Date(format(selectedDateTime, 'MM/DD/YYYY')), 'MM/DD/YYYY', true);
          selectedDateTime.setHours(0);
          selectedDateTime.setMinutes(0);
        }

        setTimeout(x => {
          that.dateTimeVal = format(selectedDateTime, mmddFormat);
          Data.endDateTimeVal = new Date(that.dateTimeVal);
        }, 1);
      } else {
        setTimeout(x => {
          that.dateTimeVal = format(selectedDateTime, mmddFormat);
          Data.endDateTimeVal = new Date(that.dateTimeVal);
        }, 1);
      }
    }

    console.log(Data.startDateTimeVal);
    console.log(Data.endDateTimeVal);
  }

  ionFocus() {

    if (this.control === 'eventStartDate') {
      this.ionMax = this.getFormattedDate(Data.endDateTimeVal, false);
    }

    if (this.control === 'eventEndDate') {
      this.ionMin = this.getFormattedDate(Data.startDateTimeVal, true);
    }
  }

  dateEntered(date, source) {

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
      //setTimeout(x => {
      this.dateEntered(this.date, 'self');
      //}, 1000);
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
      //setTimeout(x => {
      this.dateEntered(this.date, 'self');
      //}, 1000);
    }

    if (this.useIonDateTime) {
      this.focus();
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

  checkFocus() {
    this.focused = true;
  }

  checkBlur() {

    this.focused = false;
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
      component: TimepopoverComponent,
      componentProps: { control: this.control },
      event: ev,
      translucent: true,
    });


    popover.onDidDismiss()
      .then(data => {

        if (data.data === undefined) { } else {
          let timeObj = data.data;
          this.timeSetEvent(timeObj);
        }
      });

    return await popover.present();
  }

  public timeSelected(timeObj) {

    this.timeSetEvent(timeObj);
  }

  public timeSetEvent(timeObj: any) {

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
    debugger;
    if (inputDate != undefined && inputDate != '' && isDate(inputDate)) {
      let inDt = new Date();
      if (!this.includeTime) {
        if (isMin) {
          inDt.setDate(inputDate.getDate() + 1);
        } else {
          inDt.setDate(inputDate.getDate() - 1);
        }
      } else {
        inDt = inputDate;
      }

      let dt = inDt.getDate();
      let dtStr = "";
      if (dt < 10) {
        dtStr = "0" + dt.toString();
      } else {
        dtStr = dt.toString();
      }

      let mt = inDt.getMonth();
      if (this.includeTime) {
        mt = mt + 1;
      }
      let mtStr = "";
      if (mt < 10) {
        mtStr = "0" + mt.toString();
      } else {
        mtStr = mt.toString();
      }

      let retDate = (inDt.getFullYear()).toString() + "-" + mtStr + "-" + dtStr;
      return retDate;
    } else {
      let tdy = new Date();
      if (!isMin) {
        return (tdy.getFullYear() + 1).toString();
      } else {
        return (tdy.getFullYear() - 100).toString();
      }
    }
  }

  // public getFormattedIonDate(inputDate: any, isMin: boolean) {
  //   
  //   if (inputDate != undefined && inputDate != '') {
  //     let dt = inputDate.getDate();
  //     let dtStr = "";
  //     if (dt < 10) {
  //       dtStr = "0" + dt.toString();
  //     } else {
  //       dtStr = dt.toString();
  //     }
  //     let retDate: string = (inputDate.getFullYear()).toString() + "-" + (inputDate.getMonth() + 1).toString() + "-" + dtStr;
  //     retDate = retDate + " " + inputDate.getHours().toString() + ":" + inputDate.getMinutes().toString();
  //     return retDate;
  //   } else {
  //     let tdy = new Date();
  //     if (!isMin) {
  //       return (tdy.getFullYear()).toString();
  //     } else {
  //       return (tdy.getFullYear() - 100).toString();
  //     }
  //   }
  // }
}