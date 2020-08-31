import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductListComponent} from './components/product-list/product-list.component';
import {ProductPageComponent} from './components/product-page/product-page.component';

const routes: Routes = [
  {
    path: 'home',
    component: ProductListComponent
  },
  {
    path: 'product/:id',
    component: ProductPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {
}
