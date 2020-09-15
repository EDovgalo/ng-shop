import {Action, createReducer, on} from '@ngrx/store';
import * as CartActions from './cart.actions';
import {ICartState, initialCartState} from './cart.state';
import {CartProductModel} from '../../../ cart/models/cart-product.model';

const reducer = createReducer(
  initialCartState,
  on(CartActions.getCartProducts, state => {
    return {...state, isLoaded: true};
  }),
  on(CartActions.getCartProductsSuccess, (state, {cartProducts}) => {
    return {
      ...state,
      entities: transformArrayProductToObject(cartProducts),
      totalAmount: getTotalAmount(cartProducts),
      quantityProducts: getQuantityProducts(cartProducts)
    };
  }),
  on(CartActions.updateCartProductSuccess, (state, {cartProduct}) => {
    const entities = {
      ...state.entities,
      [cartProduct.id]: cartProduct
    };
    const cartProducts = Object.values(entities);
    return {
      ...state,
      entities,
      totalAmount: getTotalAmount(cartProducts),
      quantityProducts: getQuantityProducts(cartProducts)
    };
  }),
  on(CartActions.deleteCartProductSuccess, (state, {cartProduct}) => {
    const {[cartProduct.id]: removed, ...entities} = state.entities;
    const cartProducts = Object.values(entities);
    return {
      ...state,
      entities,
      totalAmount: getTotalAmount(cartProducts),
      quantityProducts: getQuantityProducts(cartProducts)
    };
  }),
  on(CartActions.getCartProductByIdSuccess, (state, {cartProduct}) => {
    const selectedProduct = cartProduct;
    return {
      ...state,
      selectedProduct
    };
  }),
  on(CartActions.getCartProductsError,
    CartActions.updateCartProductError,
    CartActions.deleteCartProductError,
    CartActions.getCartProductByIdError,
    (state, {error}) => {
      return {
        ...state,
        error
      };
    })
);

export const cartReducer = (state: ICartState | undefined, action: Action) => {
  return reducer(state, action);
};

const transformArrayProductToObject = (arr: CartProductModel[]) => {
  return arr.reduce((acc, cartProduct) => {
    return {
      ...acc,
      [cartProduct.id]: cartProduct
    };
  }, {});
};

const getTotalAmount = (arr): number => {
  return arr.reduce((acc, item) => {
    return acc + item.price * item.count;
  }, 0);
};

const getQuantityProducts = (arr): number => {
  return arr.reduce((acc, item) => {
    return acc + item.count;
  }, 0);
};
