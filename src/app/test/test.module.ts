import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { TestComponent } from './test.component';
import { TestRoutingModule } from './test-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TestRoutingModule,
    TranslateModule
  ],
  declarations: [
    TestComponent
  ]
})
export class TestModule { }
