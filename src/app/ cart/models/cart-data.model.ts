import {CartProductModel} from './cart-product.model';

export class CartDataModel {
  constructor(
    public cartProducts: CartProductModel[],
    public totalAmount: number,
    public quantityProducts: number) {
  }
}
