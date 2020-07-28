import {Injectable} from '@angular/core';
import {IProductModel} from '../../products/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  purchasedProducts: IProductModel[] = [];

  constructor() {
  }

  addProduct(product: IProductModel): void {
    this.purchasedProducts.push(product);
  }

}
