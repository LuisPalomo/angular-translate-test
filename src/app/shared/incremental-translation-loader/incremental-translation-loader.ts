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

    getTranslation(lang: string): Observable<any> {
        const translateLang = this.translationsCache[lang];
        const params: HttpParams = new HttpParams().set('locale', lang);

        return this.http.get(this.apiUrl, { params })
            .map((response) => this.translationsCache[lang] = getTranslationCache(response));

        function getTranslationCache(response) {
            return  (translateLang) ? { ...translateLang, ...response } : response;
        }
    }
}
