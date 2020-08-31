import {RouterModule, Routes} from '@angular/router';
import {OrdersPageComponent} from './components/orders-page/orders-page.component';
import {NgModule} from '@angular/core';


const routes: Routes = [
  {
    path: '',
    component: OrdersPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {

}
