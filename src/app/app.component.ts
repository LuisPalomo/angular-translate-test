import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';
import { IncrementalTranslateService } from './translate';
import { Router, Event, NavigationEnd } from '@angular/router';

import { TranslateState, getTranslateLocale } from './translate/reducers/translate';
import * as translateConstants from './translate/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  locale$: Observable<string>;

  constructor(
    private store: Store<TranslateState>,
    private _translateService: IncrementalTranslateService
  ) {
    _translateService.useLocale(translateConstants.DEFAULT_LOCALE);
    this.locale$ = store.select(getTranslateLocale);
  }

  get translateService() {
    return this._translateService;
  }
}
