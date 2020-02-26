import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Stencil components
import { applyPolyfills, defineCustomElements } from 'nolson-color-picker/loader';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

applyPolyfills().then(() => {
    defineCustomElements(window);
  });
