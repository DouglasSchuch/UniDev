import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GeneralService } from './general.service';
@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor() { }

  theme = new BehaviorSubject<string>('light');
  onBackPage = new BehaviorSubject<string>('');
  // timeScale = new BehaviorSubject<moment.Moment>(moment.tz().local());

  changeTheme(value: string) {
    this.theme.next(value);
  }

  onBack(value: string) {
    this.onBackPage.next(value);
  }
}
