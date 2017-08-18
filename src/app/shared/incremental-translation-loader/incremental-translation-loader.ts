import { Observable } from 'rxjs/Observable';
import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpParams } from '@angular/common/http';

export class IncrementalTranslationLoader implements TranslateLoader {

    private translationsCache: { [key: string]: any };

    constructor(
        private http: HttpClient,
        private apiUrl: string
    ) {
        this.translationsCache = {};
    }

    getTranslation(langView: string): Observable<any> {
        const lang = langView.split('.')[0];
        const view = langView.split('.')[1];
        const langTranslations = this.translationsCache[lang];
        const paramsLocale = new HttpParams().set('locale', lang);
        const params: HttpParams = view ? paramsLocale.set('view', view) : paramsLocale;

        return this.http.get(this.apiUrl, { params })
            .map((response) => this.translationsCache[lang] = getTranslationCache(response));

        function getTranslationCache(response) {
            return  (langTranslations) ? { ...langTranslations, ...response } : response;
        }
    }
}
