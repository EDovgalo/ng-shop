import {Component, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {Subject} from 'rxjs';

import {selectProductCartProduct} from '../../../core/@ngrx/products/products.selectors';
import {IProduct} from '../../../core/@ngrx/products/products.actions';
import {CartProductModel} from '../../../ cart/models/cart-product.model';
import * as CartActions from '../../../core/@ngrx/cart/cart.actions';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit, OnDestroy {

  product: IProduct;
  private isProductInCart: boolean;
  private destroy$ = new Subject();

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.pipe(
      select(selectProductCartProduct),
      takeUntil(this.destroy$)
    ).subscribe(resp => {
      this.product = resp.product;
      this.isProductInCart = resp.cartProduct;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onBuy(): void {
    const {name, description, price, isAvailable, rating, categories} = this.product;
    const cartProduct = new CartProductModel(null, name, description, price, isAvailable, rating, categories);
    this.store.dispatch(CartActions.addCartProduct({cartProduct}));
  }

}
