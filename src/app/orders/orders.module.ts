import {NgModule} from '@angular/core';
import {OrdersPageComponent} from './components/orders-page/orders-page.component';
import {OrdersRoutingModule} from './orders-routing.module';
import {CommonModule} from '@angular/common';
import { OrderCardComponent } from './components/order-card/order-card.component';


@NgModule({
  declarations: [OrdersPageComponent, OrderCardComponent],
  imports: [OrdersRoutingModule, CommonModule]
})
export class OrdersModule {

}
