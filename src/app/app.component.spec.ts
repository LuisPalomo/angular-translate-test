import { StoreModule } from '@ngrx/store';
import { APP_BASE_HREF } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { reducers } from './reducers';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IncrementalTranslateService } from './translate';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        TranslateModule.forRoot(),
        StoreModule.forRoot(reducers),
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        IncrementalTranslateService
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
