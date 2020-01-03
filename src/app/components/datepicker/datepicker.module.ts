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
import { TimeautocompleteModule } from './autocomplete/autocomplete.module';

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
    MatInputModule,
    TimeautocompleteModule,
  ],
  providers: [],
  declarations: [DatepickerComponent, TimepopoverComponent, DatetimemaskDirective],
  entryComponents: [DatepickerComponent, TimepopoverComponent],
  exports: [DatepickerComponent, TimepopoverComponent, DatetimemaskDirective, MatIconModule, MatFormFieldModule, MatInputModule],
})
export class DatepickerComponentModule { }
