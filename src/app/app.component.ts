import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';
import { IncrementalTranslateService } from './translate';
import { Router, Event, NavigationEnd } from '@angular/router';

import { AppState } from './app.state';
import { getLocale } from './translate/reducers/translate';
import * as translateConstants from './translate/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  locale$: Observable<string>;

  constructor(
    private store: Store<AppState>,
    private _translateService: IncrementalTranslateService
  ) {
    this._translateService.useLocale(translateConstants.DEFAULT_LOCALE);
    this.locale$ = this.store.select('translate').select(getLocale);
  }

  get translateService() {
    return this._translateService;
  }
}
