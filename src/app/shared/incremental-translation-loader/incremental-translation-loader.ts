import { Observable } from 'rxjs/Observable';
import { Translations } from './translations.model';
import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpParams } from '@angular/common/http';

export class IncrementalTranslationLoader implements TranslateLoader {

  constructor(
    private http: HttpClient,
    private translations: Translations,
    private apiUrl: string
  ) { }

  getTranslation(langView: string): Observable<any> {
    const [locale, view] = langView.split('.');
    const params = this.setHttpParams({ locale, view });

    return this.http.get(this.apiUrl, { params })
      .map((response) => this.translations.model[locale] = this.getIncrementalTranslations(response, locale));
  }

  private setHttpParams(data: any): HttpParams {
    let params = new HttpParams();

    for (const key in data) {
      if (data[key]) {
        params = params.set(key, data[key]);
      }
    }

    return params;
  }

  private getIncrementalTranslations(response: any, locale: string): any {
    const currentTranslations = this.translations.model[locale];
    return currentTranslations ? { ...currentTranslations, ...response } : response;
  }
}
