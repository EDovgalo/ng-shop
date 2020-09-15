import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../core/@ngrx/app.state';
import * as ProductsActions from '../../../core/@ngrx/products/products.actions';
import {selectProducts} from '../../../core/@ngrx/products/products.selectors';
import {ProductModel} from '../../../shared/models/product.model';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products$: Observable<ProductModel[]>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.products$ = this.store.pipe(select(selectProducts));
  }

  onDelete(product): void {
    this.store.dispatch(ProductsActions.deleteProduct({product}));
  }

}
