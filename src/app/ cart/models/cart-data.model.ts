import {CartProductModel} from './cart-product.model';

export class CartDataModel {
  constructor(
    public products: CartProductModel[],
    public totalAmount: number,
    public quantityProducts: number) {
  }
}
