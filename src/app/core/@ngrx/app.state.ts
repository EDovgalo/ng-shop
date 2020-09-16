import {IProductState} from './products/products.state';
import {ICartState} from './cart/cart.state';

export interface AppState {
  products: IProductState;
  cart: ICartState;
}
