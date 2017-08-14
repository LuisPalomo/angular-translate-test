import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const LANGUAGE_CATALAN = 'ca';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private translateService: TranslateService
  ) {
    // The deault language will be Català. This language will be used as
    // a fallback when a translation isn't found in the current language
    translateService.setDefaultLang(LANGUAGE_CATALAN);

    // Lang to use initially
    translateService.use(LANGUAGE_CATALAN);
  }
}
