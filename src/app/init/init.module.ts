import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { InitComponent } from './init.component';
import { InitRoutingModule } from './init-routing.module';

@NgModule({
  imports: [
    CommonModule,
    InitRoutingModule,
    TranslateModule
  ],
  declarations: [
    InitComponent
  ]
})
export class InitModule { }
