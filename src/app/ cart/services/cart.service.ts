import {Injectable} from '@angular/core';
import {ProductModel} from '../../shared/models/product.model';
import {CartProductModel} from '../models/cart-product.model';
import {BehaviorSubject} from 'rxjs';
import {CartDataModel} from '../models/cart-data.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private mapCartProducts = new Map();
  private channel = new BehaviorSubject<CartDataModel>(null);
  private totalSum = 0;

  quantityProducts = 0;
  channel$ = this.channel.asObservable();

  constructor() {
  }

  addProduct(product: ProductModel): void {
    const {id, name, description, price} = product;
    if (this.mapCartProducts.has(id)) {
      this.increaseQuantity(this.mapCartProducts.get(id));
    } else {
      const cartProduct = new CartProductModel(id, name, description, price);
      this.mapCartProducts.set(id, cartProduct);
    }
    this.updateChannel();
  }

  deleteProduct(cartProduct: CartProductModel): void {
    this.mapCartProducts.delete(cartProduct.id);
    this.updateChannel();
  }

  increaseQuantity(cartProduct): void {
    cartProduct.count += 1;
    this.mapCartProducts.set(cartProduct.id, cartProduct);
    this.updateChannel();
  }

  decreaseQuantity(cartProduct): void {
    cartProduct.count--;
    this.mapCartProducts.set(cartProduct.id, cartProduct);
    this.updateChannel();
  }

  resetCart(): void {
    this.mapCartProducts = new Map();
    this.updateChannel();
  }

  get cartProducts(): any {
    return Array.from(this.mapCartProducts.values());
  }

  private updateCartData(): void {
    let totalSum = 0;
    let quantityProducts = 0;
    Array.from(this.mapCartProducts.values()).forEach(item => {
      totalSum += item.price * item.count;
      quantityProducts += item.count;
      this.mapCartProducts.set(item.id, Object.assign({}, item));
    });

    this.totalSum = totalSum;
    this.quantityProducts = quantityProducts;
  }

  private updateChannel(): void {
    this.updateCartData();
    this.channel.next(new CartDataModel
      (this.cartProducts, this.totalSum, this.quantityProducts)
    );
  }

}
