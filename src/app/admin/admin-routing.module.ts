import {RouterModule, Routes} from '@angular/router';
import {AdminPageComponent} from './admin-page.component';
import {NgModule} from '@angular/core';
import {ProductListComponent} from './components/product-list/product-list.component';
import {CanActivateAdminPageGuard} from './guards/can-activate-admin-page.guard';
import {AddEditProductFromComponent} from './components/add-edit-product-from/add-edit-product-from.component';
import {AdminProductResolverGuard} from './guards/admin-product-resolver.guard';


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
            component: AddEditProductFromComponent,
          },
          {
            path: 'products/edit/:id',
            component: AddEditProductFromComponent,
            resolve: {
              product: AdminProductResolverGuard
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
