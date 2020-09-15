import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {RouterState, StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {environment} from '../../../environments/environment';
import {ProductStoreModule} from './products/product-store.module';
import {routerReducers} from './router/router.reducer';
import {CartStoreModule} from './cart/cart-store.module';
import {RouterEffects} from './router/router.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(routerReducers, {
      runtimeChecks: {
        strictStateImmutability: true, // default value is true
        strictActionImmutability: true, // default value is true
        strictStateSerializability: false, // default value is false
        strictActionSerializability: false, // default value is false
        strictActionWithinNgZone: true, // default value is false
        strictActionTypeUniqueness: true // default value is false
      },
    }),

    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal
    }),
    CartStoreModule,
    ProductStoreModule,
    EffectsModule.forRoot([RouterEffects]),

    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ]
})

export class RootStoreModule {
}
