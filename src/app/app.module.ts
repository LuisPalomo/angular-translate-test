import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { InitModule } from './init';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EmptyLoader, IncrementalTranslateService, translateReducer } from './translate';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({
      translate: translateReducer
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: EmptyLoader
      }
    }),
    InitModule
  ],
  providers: [ IncrementalTranslateService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
