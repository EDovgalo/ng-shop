import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import {SharedModule} from './shared/shared.module';

const routes: Routes = [];

@NgModule({
  // зачем тут SharedModule?
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
