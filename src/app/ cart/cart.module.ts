import {NgModule} from '@angular/core';
import {CartListComponent} from './components/cart-list/cart-list.component';
import {CartCardComponent} from './components/cart-card/cart-card.component';
import {SharedModule} from '../shared/shared.module';
import {CartRoutingModule} from './cart-routing.module';
import {ProcessOrderComponent} from './components/process-order/process-order.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CustomEmailValidatorDirective} from './components/process-order/validators/custom-email-validator.directive';

@NgModule({
  imports: [
    SharedModule,
    CartRoutingModule,
    ReactiveFormsModule
  ],
  providers: [CartListComponent], // зачем в провайдерах?
  declarations: [
    CartCardComponent,
    CartListComponent,
    ProcessOrderComponent,
    CustomEmailValidatorDirective
  ],
  exports: [CartListComponent]
})
export class CartModule {

}
