import {Injectable} from '@angular/core';
import {ProductModel} from '../../products/models/product.model';
import {CartProductModel} from '../models/cart-product.model';
import {Subject} from 'rxjs';
import {CartDataModel} from '../models/cart-data.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartProducts = new Map();
  private channel = new Subject<CartDataModel>();
  private totalSum = 0;
  private quantityProducts = 0;

  channel$ = this.channel.asObservable();

  constructor() {
  }

  addProduct(product: ProductModel): void {
    const {id, name, description, price} = product;
    if (this.cartProducts.has(id)) {
      this.increaseQuantity(this.cartProducts.get(id));
    } else {
      const cartProduct = new CartProductModel(id, name, description, price);
      this.cartProducts.set(id, cartProduct);
    }
    this.updateCartData();
  }

  deleteProduct(cartProduct: CartProductModel): void {
    this.cartProducts.delete(cartProduct.id);
    this.updateCartData();
  }

  increaseQuantity(cartProduct): void {
    cartProduct.count += 1;
    this.cartProducts.set(cartProduct.id, cartProduct);
    this.updateCartData();
  }

  decreaseQuantity(cartProduct): void {
    cartProduct.count--;
    this.cartProducts.set(cartProduct.id, cartProduct);
    this.updateCartData();
  }

  private updateCartData(): void {
    let totalSum = 0;
    let quantityProducts = 0;
    const cloneProducts = Array.from(this.cartProducts.values()).map(item => {
      totalSum += item.price * item.count;
      quantityProducts += item.count;
      return Object.assign({}, item);
    });

    this.totalSum = totalSum;
    this.quantityProducts = quantityProducts;

    this.channel.next(new CartDataModel
      (cloneProducts, totalSum, quantityProducts)
    );
  }

}
