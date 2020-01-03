import { Component, ViewChild, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatAutocompleteTrigger, MatAutocompleteSelectedEvent } from '@angular/material';
import { Data } from 'src/app/data';

@Component({
  selector: 'app-timeautocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class TimeautocompleteComponent implements OnInit {
  @Input()
  control: string;

  @Output() timeSelected = new EventEmitter<any>();

  // @Output() selectedOption = new EventEmitter<any>();

  // @Output() optionSelected = new EventEmitter<any>();

  // @Output() addOptionClicked = new EventEmitter<any>();

  @Output() opened = new EventEmitter<any>();

  @Output() closed = new EventEmitter<any>();

  @ViewChild('optionAutoCompleteInput', { read: MatAutocompleteTrigger, static: false })

  optionAutoCompleteInput: MatAutocompleteTrigger;

  showTracksSection: any;

  public times;
  // public startTimeVal: number;
  // public endTimeVal: number;
  // public startDateVal: Date;
  // public endDateVal: Date;

  ngOnInit() {
    // this.startTimeVal = Data.startTimeVal;
    // this.endTimeVal = Data.endTimeVal;
    // this.startDateVal = Data.startDateVal;
    // this.endDateVal = Data.endDateVal;
    this.times = Data.times;
  }

  public check(time: any) {
    if (Data.startDateVal == undefined || Data.endDateVal == undefined || Data.startDateVal.toDateString() == Data.endDateVal.toDateString()) {
      if (this.control == "eventEndDate") {
        if (Data.startTimeVal == 0) {
          return true;
        } else {
          if (time[0] > Data.startTimeVal) {
            return true;
          }
        }
      } else if (this.control == "eventStartDate") {
        if (Data.endTimeVal == 0) {
          return true;
        } else {
          if (time[0] < Data.endTimeVal) {
            return true;
          }
        }
      }
    } else {
      return true;
    }

    return false;
  }

  optionSelected(event) {
    this.timeSelected.emit(event.option.value);
  }

  // selectPrediction(prediction) {
  //   debugger;
  //   this.selectedOption.emit(prediction);
  // }

  open() {
    this.optionAutoCompleteInput.openPanel();
  }

  // addOption(i) {
  //   // This adds option to a dialogue box
  //   this.optionSelected.emit(i);
  // }

  // emitAddOption() {

  //   // This loads manage options page
  //   this.addOptionClicked.emit();
  // }

  autoopened() {
    this.opened.emit();
  }

  autoclosed() {
    this.closed.emit();
  }
}
