import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { PagesModule } from'./pages/pages.module';
import { Error404Component } from './pages/error404/error404.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
  },
  {
    path: 'data',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule),
  },
  {
    path: 'maps',
    loadChildren: () => import('./maps/maps.module').then( m => m.MapsPageModule),
  },
  {
    path: 'uploader',
    loadChildren: () => import('./uploader/uploader.module').then( m => m.UploaderPageModule),
  },

  { 
    path: '404', 
    component: Error404Component
  },

  // Page Not found
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    PagesModule,
  ],
  declarations: [
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {}
