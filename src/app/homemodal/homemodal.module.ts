import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomemodalPageRoutingModule } from './homemodal-routing.module';

import { HomemodalPage } from './homemodal.page';

import { MatNativeDateModule, MatDatepickerModule, MatAutocompleteModule } from '@angular/material';

import { ChipselectComponentModule } from '../components/chipselect/chipselect.module';
import { DatepickerComponentModule } from '../components/datepicker/datepicker.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomemodalPageRoutingModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    ChipselectComponentModule,
    DatepickerComponentModule
  ],
  declarations: [HomemodalPage]
})
export class HomemodalPageModule {}
