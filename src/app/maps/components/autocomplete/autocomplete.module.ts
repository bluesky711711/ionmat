import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { AutocompleteComponent } from './autocomplete.component';

import { MatInputModule, MatAutocompleteModule } from '@angular/material';

@NgModule({
  declarations: [
    AutocompleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
  ],
  exports: [
    AutocompleteComponent
  ],
  entryComponents: [
    AutocompleteComponent
  ]
})
export class AutocompleteModule {}