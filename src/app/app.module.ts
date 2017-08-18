import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { InitComponent, TestComponent } from './components';
import { ExternalTranslationLoader, IncrementalTranslationLoader } from './shared';

const API_URL = 'http://localhost:8080/api/translations';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new IncrementalTranslationLoader(http, API_URL);
}

@NgModule({
  declarations: [
    AppComponent,
    InitComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
