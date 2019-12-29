import { Directive, HostListener, ElementRef, ViewChild } from '@angular/core';
import { isDate } from 'date-fns';
import { Data } from 'src/app/data';
import { DatepickerComponent } from 'src/app/components/datepicker/datepicker.component';
import { TimepopoverComponent } from '../timepopover/timepopover.component';

@Directive({
  selector: '[appDatetimemask]'
})
export class DatetimemaskDirective {
  public validInputDate: Date;
  public validInputTime: string;
  public validInputTimeVal: number;

  constructor(private element: ElementRef, private dtPicker: DatepickerComponent) {
  }

  @HostListener('ionInput', ['$event'])
  onKeyDown(event: any) {
    if (this.dtPicker.control === 'eventStartDate') {
      Data.startTimeVal = 0;
    } else if (this.dtPicker.control === 'eventEndDate') {
      Data.endTimeVal = 0;
    }

    const input = this.element.nativeElement.value;

    let ddmmtrimmed = input.replace(/[^0-9]/g, '');

    if (ddmmtrimmed.length > 12) {
      ddmmtrimmed = ddmmtrimmed.substr(0, 12);
    }

    const ddmm = [];

    for (let i = 0; i < ddmmtrimmed.length; i += 2) {
      ddmm.push(ddmmtrimmed.substr(i, 2));
    }

    if (ddmm.length === 0) {
      this.element.nativeElement.value = '';
    }

    if (ddmm.length === 1) {
      this.element.nativeElement.value = ddmm[0];
    }

    if (ddmm.length === 2) {
      this.element.nativeElement.value = ddmm[0] + '/' + ddmm[1];
    }

    if (ddmm.length === 3) {
      this.element.nativeElement.value = ddmm[0] + '/' + ddmm[1] + '/' + ddmm[2];
    }

    if (ddmm.length === 4) {
      this.element.nativeElement.value = ddmm[0] + '/' + ddmm[1] + '/' + ddmm[2] + ddmm[3];
      if (input.length == 10) {
        let formattedDateString: string = ddmm[1] + '/' + ddmm[0] + '/' + ddmm[2] + ddmm[3];
        let formattedDate: Date = new Date(formattedDateString);
        if (isDate(formattedDate)) {
          this.validInputDate = formattedDate;
          debugger;
          this.dtPicker.datePickerVal = this.validInputDate;
          if (this.dtPicker.control === 'eventStartDate') {
            Data.startDateVal = this.validInputDate;
          } else if (this.dtPicker.control === 'eventEndDate') {
            Data.endDateVal = this.validInputDate;
          }

          this.dtPicker.focus();
          this.dtPicker.dateEntered(this.validInputDate, 'self');
        }
      }
    }

    if (ddmm.length === 5) {
      this.element.nativeElement.value = ddmm[0] + '/' + ddmm[1] + '/' + ddmm[2] + ddmm[3] + ' ' + ddmm[4];
    }

    if (ddmm.length === 6) {
      this.element.nativeElement.value = ddmm[0] + '/' + ddmm[1] + '/' + ddmm[2] + ddmm[3] + ' ' + ddmm[4] + ':' + ddmm[5];

      Data.times.forEach(timeObj => {
        let inputTime = ddmm[4] + ':' + ddmm[5];
        if (timeObj[1] == inputTime) {
          this.validInputTime = inputTime;
          if (this.dtPicker.control === 'eventStartDate') {
            Data.startTimeVal = parseInt(timeObj[0].toString());
          } else if (this.dtPicker.control === 'eventEndDate') {
            Data.endTimeVal = parseInt(timeObj[0].toString());
          }

          this.dtPicker.focus();
          this.dtPicker.timeSetEvent(timeObj);
        }
      });
    }
  }
}
