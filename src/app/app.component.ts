import { Component } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

const LANGUAGE_CATALAN = 'ca';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private _translateService: TranslateService,
    private router: Router
  ) {
    // The deault language will be Català. This language will be used as
    // a fallback when a translation isn't found in the current language
    _translateService.setDefaultLang(LANGUAGE_CATALAN);

    // Lang to use initially
    _translateService.use(LANGUAGE_CATALAN);

    // Request for the proper translations everytime a navigation ends
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this._translateService.use(this._translateService.currentLang.split('.')[0] + '.' + event.url.split('/')[1]);
      }
    });
  }

  changeLanguage(lang: string): void {
    // First load the common translations and then, the view translations
    this._translateService.use(lang);
    this._translateService.use(lang + '.' + this.router.url.split('/')[1]);
  }

  get translateService() {
    return this._translateService;
  }
}
