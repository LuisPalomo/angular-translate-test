import { Observable } from 'rxjs/Observable';
import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Translations } from './translations.model';

export class IncrementalTranslationLoader implements TranslateLoader {

  private translations: Translations;

  constructor(
    private http: HttpClient,
    private apiUrl: string
  ) {
    this.translations = new Translations({});
  }

  getTranslation(langView: string): Observable<any> {
    const lang = langView.split('.')[0];
    const view = langView.split('.')[1];
    const paramsLocale = new HttpParams().set('locale', lang);
    const params: HttpParams = view ? paramsLocale.set('view', view) : paramsLocale;
    const getTranslationCache = (response) =>
      this.translations.cache[lang] ? { ...this.translations.cache[lang], ...response } : response;

    return this.http.get(this.apiUrl, { params })
      .map((response) => this.translations.cache[lang] = getTranslationCache(response));
  }
}
