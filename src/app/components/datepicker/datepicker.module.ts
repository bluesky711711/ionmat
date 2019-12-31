import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { MatNativeDateModule, MatDatepickerModule, MatAutocompleteModule, MatIconModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { TimepopoverComponent } from './timepopover/timepopover.component';
import { DatepickerComponent } from './datepicker.component';
import { TimeautocompleteComponent } from './autocomplete/autocomplete.component';
import { DatetimemaskDirective } from './directives/datetimemask.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    IonicModule,
    RouterModule.forChild([]),
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  declarations: [DatepickerComponent, TimepopoverComponent, DatetimemaskDirective, TimeautocompleteComponent],
  entryComponents: [DatepickerComponent, TimepopoverComponent, TimeautocompleteComponent],
  exports: [DatepickerComponent, TimepopoverComponent, DatetimemaskDirective, TimeautocompleteComponent, MatIconModule, MatFormFieldModule, MatInputModule],
})
export class DatepickerComponentModule { }