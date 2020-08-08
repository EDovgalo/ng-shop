import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {CartDataModel} from '../../models/cart-data.model';
import {Subscription} from 'rxjs';
import {CartProductModel} from '../../models/cart-product.model';
import {ProductModel} from '../../../products/models/product.model';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit, OnDestroy {

  cartInfo: CartDataModel = {} as CartDataModel;
  sortFields = ['price', 'count', 'name'];
  sortBy = this.sortFields[0];
  isSortAsc = false;

  private cartInfoSub: Subscription;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.cartInfoSub = this.cartService.channel$.subscribe(cartInfo => this.cartInfo = cartInfo);
  }

  ngOnDestroy(): void {
    this.cartInfoSub.unsubscribe();
  }

  deleteProduct(product: CartProductModel): void {
    this.cartService.deleteProduct(product);
  }

  increaseQuantity(product: CartProductModel): void {
    this.cartService.increaseQuantity(product);
  }

  decreaseQuantity(product: CartProductModel): void {
    this.cartService.decreaseQuantity(product);
  }

}
