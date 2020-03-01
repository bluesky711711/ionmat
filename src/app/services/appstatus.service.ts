import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AppstatusService {

  public breakpoint: string;
  public width: number;

  public fixed: boolean;

  public newBreakpoint: BehaviorSubject<string> = new BehaviorSubject<string>(this.breakpoint);

  public splitpaneDisabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public newWidth: BehaviorSubject<number> = new BehaviorSubject<number>(this.width);
  public newFixed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.fixed);

  constructor(public plt: Platform) { }

  splitpaneUpdate(disabled) {
    if (disabled === true) {
    this.splitpaneDisabled.next(true);
      } else {
    this.splitpaneDisabled.next(false);
    }

  }
}
