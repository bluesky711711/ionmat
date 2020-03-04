import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatInputModule, MatAutocompleteModule } from '@angular/material';

import { MapsPageRoutingModule } from './maps-routing.module';

import { MapsPage } from './maps.page';
import { GoogleplacessearchComponent } from './components/googleplacessearch/googleplacessearch.component';
import { MapsautocompleteModule } from './components/autocomplete/autocomplete.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MapsPageRoutingModule,
    MatInputModule,
    MatAutocompleteModule,
    MapsautocompleteModule
  ],
  declarations: [MapsPage, GoogleplacessearchComponent]
})
export class MapsPageModule {}
