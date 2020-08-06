import {Injectable} from '@angular/core';
import {ProductModel} from '../../products/models/product.model';
import {CartProductModel} from '../models/cart-product.model';
import {Subject} from 'rxjs';
import {CartDataModel} from '../models/cart-data.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartProducts: CartProductModel[] = [];
  private channel = new Subject<CartDataModel>();
  private totalAmount = 0;
  private quantityProducts = 0;

  channel$ = this.channel.asObservable();

  constructor() {
  }

  addProduct(product: ProductModel): void {
    const {id, name, description, price} = product;
    let cartProduct = this.getProductById(id);
    if (!cartProduct) {
      cartProduct = new CartProductModel(id, name, description, price);
      this.cartProducts.push(cartProduct);
    }
    this.increaseQuantity(cartProduct);
    this.updateChannelData();
  }

  deleteProduct(cartProduct: CartProductModel): void {
    this.cartProducts = this.removeProductFromList(cartProduct);
    this.totalAmount -= cartProduct.price * cartProduct.count;
    this.quantityProducts -= cartProduct.count;
    this.updateChannelData();
  }

  increaseQuantity(cartProduct): void {
    cartProduct.count++;
    this.quantityProducts++;
    this.totalAmount += cartProduct.price;
    this.updateChannelData();
  }

  decreaseQuantity(cartProduct): void {
    cartProduct.count--;
    this.quantityProducts -= 1;
    this.totalAmount -= cartProduct.price * cartProduct.count;
    this.updateChannelData();
  }

  private removeProductFromList(cartProduct): CartProductModel[] {
    return this.cartProducts.filter(item => item.id !== cartProduct.id);
  }

  private getProductById(id): CartProductModel {
    return this.cartProducts.find(item => item.id === id);
  }

  private updateChannelData(): void {
    const cloneProducts = this.cartProducts.map(item => Object.assign({}, item));
    this.channel.next(new CartDataModel
      (cloneProducts, this.totalAmount, this.quantityProducts)
    );
  }

}
