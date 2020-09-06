import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminPageComponent} from './admin-page.component';
import {AdminRoutingModule} from './admin-routing.module';
import {ProductListComponent} from './components/product-list/product-list.component';
import {ProductFromComponent} from './components/product-from/product-from.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [AdminPageComponent, ProductListComponent, ProductFromComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule {
}
