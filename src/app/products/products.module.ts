import {NgModule} from '@angular/core';
import {ProductComponent} from './components/product/product.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [
    ProductComponent,
    ProductListComponent
  ],
  exports: [ProductListComponent]
})
export class ProductsModule {

}
