import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductListComponent} from './components/product-list/product-list.component';
import {ProductPageComponent} from './components/product-page/product-page.component';
import {LoadCartProductsGuard} from '../ cart/guards/load-cart-products.guard';
import {LoadProductsGuard} from '../core/guards/load-products.guard';

const routes: Routes = [
  {
    path: 'home',
    component: ProductListComponent,
    canActivate: [LoadProductsGuard]
  },
  {
    path: 'product/:id',
    component: ProductPageComponent,
    canActivate: [LoadCartProductsGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {
}
