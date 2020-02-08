import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { ListPage } from './list.page';

import { ScrollDetectorDirective } from '../directives/scroll-detector.directive';
import { DragScrollModule } from 'cdk-drag-scroll';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DragDropModule,
    DragScrollModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListPage
      }
    ])
  ],
  declarations: [ListPage, ScrollDetectorDirective]
})
export class ListPageModule {}
