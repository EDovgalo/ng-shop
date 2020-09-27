import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminPageComponent} from './admin-page.component';
import {AdminRoutingModule} from './admin-routing.module';
import {ProductListComponent} from './components/product-list/product-list.component';
import {ProductFormComponent} from './components/product-form/product-form.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [AdminPageComponent, ProductListComponent, ProductFormComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule {
}
