import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {pluck} from 'rxjs/operators';
import {Store} from '@ngrx/store';

import {ProductCategoryEnum, ProductModel} from '../../../shared/models/product.model';
import * as ProductsActions from '../../../core/@ngrx/products/products.actions';

@Component({
  selector: 'app-add-edit-product-from',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  productCategories = this.initProductCategories();
  product = {} as ProductModel;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store) {
  }

  ngOnInit(): void {
    this.route.data.pipe(pluck('product')).subscribe((product: ProductModel) => {
      this.product = {...product};
    });
  }

  onSave(): void {
    const product = {...this.product};
    this.product.id ? this.store.dispatch(ProductsActions.updateProduct({product}))
      : this.store.dispatch(ProductsActions.addProduct({product}));
  }

  private initProductCategories(): any {
    return Object.entries(ProductCategoryEnum).map(item => {
      return {key: item[0], value: item[1]};
    });
  }

}
