import { Directive, HostListener, ElementRef, ViewChild, Renderer2, Input } from '@angular/core';
import { isDate } from 'date-fns';
import { Data } from 'src/app/data';
import { DatepickerComponent } from 'src/app/components/datepicker/datepicker.component';
import { TimepopoverComponent } from '../timepopover/timepopover.component';
import { IonInput } from '@ionic/angular';

@Directive({
  selector: '[appDatetimemask]'
})
export class DatetimemaskDirective {
  public validInputDate: Date;
  public validInputTime: string;
  public validInputTimeVal: number;
  private currentValue = '';

  //Mu'men Tayyem

  @Input() isAllDay;

  //Mu'men Tayyem

  constructor(private element: ElementRef, private dtPicker: DatepickerComponent) {
  }

  @HostListener('ionInput', ['$event'])
  onKeyDown(event: any) {

    //Mu'men Tayyem

    let tokens = event.target.value.split('/');
    if (tokens.length==3 && event.target.value.length>=10){
      let days = tokens[0];
      let months = tokens[1]-1;
      let years = tokens[2];

      if (days>0 && days<32 && months>=0 && months<12){
       
      }else{
        setTimeout(() => {
          (event.target as IonInput).value = 'Invalid Date!';
        }, 10);
      }
    }

    let lastCharInserted = event.detail.data;
    if (isNaN(lastCharInserted)) {
      if (lastCharInserted != ' ') {
        setTimeout(() => {
          (event.target as IonInput).value = this.currentValue;
        }, 10);
        return;
      }
    }

    //Mu'men Tayyem


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
          ;
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

    this.currentValue = this.element.nativeElement.value;
  }
}
