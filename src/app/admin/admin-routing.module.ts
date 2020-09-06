import {RouterModule, Routes} from '@angular/router';
import {AdminPageComponent} from './admin-page.component';
import {NgModule} from '@angular/core';
import {ProductListComponent} from './components/product-list/product-list.component';
import {CanActivateAdminPageGuard} from './guards/can-activate-admin-page.guard';
import {ProductFromComponent} from './components/product-from/product-from.component';
import {AdminProductResolver} from './guards/admin-product.resolver';


const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    canActivateChild: [CanActivateAdminPageGuard],
    children: [
      {
        path: '',
        canActivateChild: [CanActivateAdminPageGuard],
        children: [
          {
            path: 'products',
            component: ProductListComponent
          },
          {
            path: 'products/add',
            component: ProductFromComponent,
          },
          {
            path: 'products/edit/:id',
            component: ProductFromComponent,
            resolve: {
              product: AdminProductResolver
            },
          },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {

}
