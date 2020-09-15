import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {ProductsModule} from './products/products.module';
import {CartModule} from './ cart/cart.module';
import {CoreModule} from './core/core.module';
import {HttpClientModule} from '@angular/common/http';
import {httpInterceptorFactory} from './core/intreceptors';
import {RootStoreModule} from './core/@ngrx/root-store.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RootStoreModule,
    SharedModule,
    ProductsModule,
    CartModule,
    CoreModule,
    AppRoutingModule,
  ],
  providers: [httpInterceptorFactory(['products'])],
  bootstrap: [AppComponent]
})
export class AppModule {
}
