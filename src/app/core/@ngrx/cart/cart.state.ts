import {CartProductModel} from '../../../ cart/models/cart-product.model';

export interface ICartState {
  entities: Readonly<{ [id: number]: CartProductModel }>;
  readonly totalAmount: number;
  readonly quantityProducts: number;
  readonly error: Error | string;
  selectedProduct: CartProductModel;
  isLoaded: boolean;
}

export const initialCartState: ICartState = {
  entities: {},
  totalAmount: 0,
  quantityProducts: 0,
  error: null,
  selectedProduct: null,
  isLoaded: false
};
