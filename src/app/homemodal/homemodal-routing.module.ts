import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomemodalPage } from './homemodal.page';

const routes: Routes = [
  {
    path: '',
    component: HomemodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomemodalPageRoutingModule {}
