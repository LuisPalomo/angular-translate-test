import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { translateReducer } from './reducers/translate';
import { IncrementalTranslateService } from './incremental-translate-service/incremental-translate.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    StoreModule.forFeature('translate', translateReducer),
    TranslateModule.forChild(),
  ],
  providers: [
    IncrementalTranslateService
  ]
})
export class StoreTranslateModule { }
