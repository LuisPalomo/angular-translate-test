import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { InitModule } from './init';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { IncrementalTranslateService } from './translate';
import { StoreTranslateModule } from './translate/store-translate.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    TranslateModule.forRoot(),
    StoreTranslateModule,
    InitModule,
  ],
  providers: [ IncrementalTranslateService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
