import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { InitModule } from './init';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ExternalTranslationLoader, IncrementalTranslationLoader, Translations } from './shared';

const API_URL = 'http://localhost:8080/api/translations';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient, translations: Translations) {
  return new IncrementalTranslationLoader(http, translations, API_URL);
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient, Translations]
      }
    }),
    InitModule
  ],
  providers: [Translations],
  bootstrap: [AppComponent]
})
export class AppModule { }
