import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

import 'rxjs/add/operator/withLatestFrom';

import { API_URL } from '../constants';
import { UpdateState, AddTranslations } from '../actions/translate';
import { TranslateState, getLocale, getTranslations } from '../reducers/translate';
import { AppState, getTranslateLocale, getTranslateTranslations } from '../../reducers';

@Injectable()
export class IncrementalTranslateService {

  private alreadyGotten: string[];

  constructor(
    private store: Store<AppState>,
    private translateService: TranslateService,
    private router: Router,
    private http: HttpClient
  ) {
    this.alreadyGotten = [];

    const localeState = this.store.select(getTranslateLocale);
    const translationsState = this.store.select(getTranslateTranslations);

    // Subscribe to changes on the State Locale and change the locale used by TranslateService to it
    localeState.subscribe(
      (locale) => this.translateService.use(locale)
    );

    // Subscribe to changes on the State Translations and add those translations to the Translate service
    translationsState.withLatestFrom(localeState).subscribe(
      ([translations, locale]) => this.translateService.setTranslation(locale, translations, true)
    );

    // Subscribe to Router events and increase the current translations with the new ones
    this.router.events.withLatestFrom(localeState).subscribe(
      ([event, locale]) => {
        // TODO: Add the "isLoading" spinner and the resolve to avoid seeing the initial keys of translations
        if (event instanceof NavigationEnd) {
          const view = event.urlAfterRedirects.split('/')[1];
          this.incrementTranslations(locale, view);
        }
      }
    );
  }

  useLocale(locale: string) {
    if (!this.alreadyGotten.includes(locale)) {
      this.getHttpTranslations(locale).subscribe(
        (translations) => {
          const changeAction = new UpdateState({ locale, translations });
          this.store.dispatch(changeAction);
        },
        this.errorHandler(locale)
      );
    } else {
      const translations = this.translateService.translations[locale];
      const changeAction = new UpdateState({ locale, translations });
      this.store.dispatch(changeAction);
    }
    const view = this.router.url.split('/')[1];
    this.incrementTranslations(locale, view);
  }

  private incrementTranslations(locale: string, view: string): void {
    if (!this.alreadyGotten.includes(locale + view)) {
      this.getHttpTranslations(locale, view).subscribe(
        (translations) => {
          const addAction = new AddTranslations({ translations });
          this.store.dispatch(addAction);
        },
        this.errorHandler(locale + view)
      );
    }
  }

  private getHttpTranslations(locale: string, view = ''): Observable<{ [key: string]: string }> {
    this.alreadyGotten.push(locale + view);
    const params = this.setHttpParams({ locale, view });

    return this.http.get(API_URL, { params })
      .map((translations) => translations as { [key: string]: string });
  }

  // TODO: Move this function to a common/utils module
  private setHttpParams(data: any): HttpParams {
    let params = new HttpParams();

    for (const key in data) {
      if (data[key]) {
        params = params.set(key, data[key]);
      }
    }

    return params;
  }

  private errorHandler(alreadyGottenKey: string): (error: any) => void {
    return (error) => {
      const index = this.alreadyGotten.indexOf(alreadyGottenKey);
      if (index >= 0) {
        this.alreadyGotten.splice(index, 1);
      }
      // TODO: Define the way that errors will be handled in the app
      console.log(JSON.stringify(error));
    };
  }

}
