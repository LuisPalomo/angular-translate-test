import { NgModule } from '@angular/core';
import { InitComponent } from './init.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'init',
    component: InitComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InitRoutingModule { }
