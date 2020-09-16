import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';

import {CartProductModel} from '../../models/cart-product.model';
import {OrdersService} from '../../../orders/services/orders.service';
import {ToasterService} from '../../../widgets/services/toaster.service';
import {AppSettingsService} from '../../../core/services/app-settings/app-settings.service';
import {selectCartData} from '../../../core/@ngrx/cart/cart.selectors';
import * as CartAction from '../../../core/@ngrx/cart/cart.actions';
import {deleteCartProduct, updateCartProduct} from '../../../core/@ngrx/cart/cart.actions';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit, OnDestroy {

  sortFields = ['price', 'count', 'name'];
  quantityProducts: number;
  totalAmount: number;
  cartProducts: CartProductModel[];
  settings = {
    sortBy: null,
    isSortAsc: null,
  };
  private destroy$ = new Subject();

  constructor(private toaster: ToasterService,
              private appSettingsService: AppSettingsService,
              private orderService: OrdersService,
              private store: Store) {
  }

  ngOnInit(): void {
    this.loadCartData();
    this.loadSettings();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onCreateOrder(): void {
    const orderId = this.orderService.createOrder(this.cartProducts);
    this.store.dispatch(CartAction.confirmOrder({orderId, cartProducts: this.cartProducts}));
  }

  deleteProduct(cartProduct: CartProductModel): void {
    this.store.dispatch(deleteCartProduct({cartProduct}));
  }

  increaseQuantity(product: CartProductModel): void {
    const updatedProduct = {...product};
    updatedProduct.count++;
    this.store.dispatch(updateCartProduct({cartProduct: updatedProduct}));
  }

  decreaseQuantity(product: CartProductModel): void {
    const updatedProduct = {...product};
    updatedProduct.count--;
    this.store.dispatch(updateCartProduct({cartProduct: updatedProduct}));
  }

  saveFilters(key, value): void {
    this.appSettingsService.saveSettings(key, value);
  }

  private loadCartData(): void {
    this.store.dispatch(CartAction.getCartProducts());
    this.store.pipe(select(selectCartData)).pipe(
      takeUntil(this.destroy$)
    ).subscribe(resp => {
      this.cartProducts = resp.cartProducts;
      this.totalAmount = resp.totalAmount;
      this.quantityProducts = resp.quantityProducts;
    });
  }

  private loadSettings(): void {
    this.appSettingsService.getSettings().pipe(
      takeUntil(this.destroy$)
    ).subscribe(result => {
      this.settings.sortBy = result.sortBy;
      this.settings.isSortAsc = result.isSortAsc;
    });
  }

}
