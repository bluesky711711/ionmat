import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ChipautocompleteComponent } from './chipautocomplete.component';

import { MatInputModule, MatAutocompleteModule } from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    ChipautocompleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    OverlayModule
  ],
  exports: [
    ChipautocompleteComponent
  ],
  entryComponents: [
    ChipautocompleteComponent
  ]
})
export class ChipautocompleteModule {}