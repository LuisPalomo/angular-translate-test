import { Observable } from 'rxjs/Observable';
import { TranslateLoader } from '@ngx-translate/core';

export class EmptyLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return Observable.of({});
  }
}
