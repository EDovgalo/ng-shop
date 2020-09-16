import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {productsReducer} from './product.reducer';
import {CommonModule} from '@angular/common';
import {ProductsEffects} from './products.effects';
import {EffectsModule} from '@ngrx/effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('products', productsReducer),
    EffectsModule.forFeature([ProductsEffects])
  ]
})
export class ProductStoreModule {

}
