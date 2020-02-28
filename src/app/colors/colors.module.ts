import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColorsPageRoutingModule } from './colors-routing.module';

import { ColorsPage } from './colors.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColorsPageRoutingModule
  ],
  declarations: [ColorsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ColorsPageModule {}
