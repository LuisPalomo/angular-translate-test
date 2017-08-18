import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';

export class ExternalTranslationLoader implements TranslateLoader {

    constructor(
        private http: HttpClient,
        private apiUrl: string
    ) { }

    getTranslation(lang: string): Observable<any> {
        return this.http.get(this.apiUrl + '/' + lang);
    }
}
