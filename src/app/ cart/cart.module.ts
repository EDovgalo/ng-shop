import {NgModule} from '@angular/core';
import {CartListComponent} from './components/cart-list/cart-list.component';
import {CartCardComponent} from './components/cart-card/cart-card.component';
import {SharedModule} from '../shared/shared.module';
import {CartRoutingModule} from './cart-routing.module';

@NgModule({
  imports: [SharedModule, CartRoutingModule],
  providers: [CartListComponent],
  declarations: [CartCardComponent, CartListComponent],
  exports: [CartListComponent]
})
export class CartModule {

}
