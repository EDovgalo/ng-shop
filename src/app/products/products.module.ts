import {NgModule} from '@angular/core';
import {ProductListComponent} from './components/product-list/product-list.component';
import {SharedModule} from '../shared/shared.module';
import {ProductRoutingModule} from './product-routing.module';
import {ProductPageComponent} from './components/product-page/product-page.component';

@NgModule({
  imports: [
    SharedModule,
    ProductRoutingModule
  ],
  declarations: [
    ProductListComponent,
    ProductPageComponent
  ],
  exports: [ProductListComponent]
})
export class ProductsModule {

}
