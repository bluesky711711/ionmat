import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppstatusService } from './services/appstatus.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public splitplanedisabled: any;

  public breakpoints = {  xs: 0,
                          sm: 576 ,
                          md: 768 ,
                          lg: 992 ,
                          xl: 1200 };
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Maps',
      url: '/maps',
      icon: 'map'

    },
    {
      title: 'Uploader',
      url: '/uploader',
      icon: 'cloud-upload'
    },
    {
      title: 'Colors',
      url: '/colors',
      icon: 'color-palette'
    },
    {
      title: 'Calendar',
      url: '/calendar',
      icon: 'calendar'
    },
    {
      title: 'Data',
      url: '/data',
      icon: 'grid'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private appStatus: AppstatusService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // Handles splitpane status
      this.appStatus.splitpaneDisabled.subscribe(status => {
        this.splitplanedisabled = status;
      });

      // Handles viewport size & fixed
      const breakpointValues = Object.values(this.breakpoints);

      this.appStatus.newWidth.next(this.platform.width());
      this.appStatus.newBreakpoint.next(this.getBreakpoint(breakpointValues));

      // Handles fixed state 
      this.setFixed(breakpointValues);
 
      // Handles viewport change in size
      this.platform.resize.subscribe(async () => {
        this.appStatus.newBreakpoint.next(this.getBreakpoint(breakpointValues));
        this.appStatus.newWidth.next(this.platform.width());
        this.setFixed(breakpointValues);
      });
    });
  }

  getBreakpoint(breakpointValues): string {
    let result = null;
    if ((breakpointValues.findIndex(size => size > this.platform.width() ) - 1) === -2 ) { result = 4; } else {
          result = breakpointValues.findIndex(size => size > this.platform.width() ) - 1;
        }

    const breakpointKeys = Object.keys(this.breakpoints);
    const breakpointString = breakpointKeys[result].toString();
    return breakpointString;

  }

  setFixed(breakpointValues) {
    if ((this.getBreakpoint(breakpointValues) === 'xs') || (this.getBreakpoint(breakpointValues) === 'sm') || (this.getBreakpoint(breakpointValues) ==='md')) {
      return this.appStatus.newFixed.next(false);
    } else { return this.appStatus.newFixed.next(true); }

  }
}
