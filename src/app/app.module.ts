import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';

import { InitModule } from './init';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { EmptyLoader, IncrementalTranslateService } from './translate';
import { reducers } from './reducers';
import { PruebaService } from './prueba.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: EmptyLoader
      }
    }),
    InitModule
  ],
  providers: [
    IncrementalTranslateService,
    { provide: TranslateService, useClass: PruebaService }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
