import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffectsModule} from '@ngrx/effects';
import {CartEffects} from './cart.effects';
import {StoreModule} from '@ngrx/store';
import {cartReducer} from './cart.reducer';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('cart', cartReducer),
    EffectsModule.forFeature([CartEffects])
  ]
})
export class CartStoreModule {
}
