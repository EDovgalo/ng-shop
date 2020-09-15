import {createAction, props} from '@ngrx/store';
import {CartProductModel} from '../../../ cart/models/cart-product.model';

export const getCartProducts = createAction('[Cart page] GET_CART_PRODUCTS');

export const getCartProductsSuccess = createAction(
  '[Get cart product effect] GET_CART_PRODUCTS_SUCCESS',
  props<{ cartProducts: CartProductModel[] }>()
);

export const getCartProductsError = createAction(
  '[Get cart products effect] GET_CART_PRODUCTS_SUCCESS',
  props<{ error: Error | string }>()
);

export const updateCartProduct = createAction(
  '[Cart page] UPDATE_CART_PRODUCT',
  props<{ cartProduct: CartProductModel }>()
);

export const updateCartProductSuccess = createAction(
  '[Update cart product effect] UPDATE_CART_PRODUCT_SUCCESS',
  props<{ cartProduct: CartProductModel }>()
);

export const updateCartProductError = createAction(
  '[Update cart product effect] UPDATE_CART_PRODUCT_ERROR',
  props<{ error: Error | string }>()
);

export const deleteCartProduct = createAction(
  '[Cart page] DELETE_CART_PRODUCT',
  props<{ cartProduct: CartProductModel }>()
);

export const deleteCartProductSuccess = createAction(
  '[Delete cart product effect] DELETE_CART_PRODUCT_SUCCESS',
  props<{ cartProduct: CartProductModel }>()
);

export const deleteCartProductError = createAction(
  '[Delete cart product effect] DELETE_CART_PRODUCT_ERROR',
  props<{ error: Error | string }>()
);

export const addCartProduct = createAction(
  '[Product page] ADD_CART_PRODUCT',
  props<{ cartProduct: CartProductModel }>()
);


export const addCartProductSuccess = createAction(
  '[Add cart product effect] ADD_CART_PRODUCT_SUCCESS',
  props<{ cartProduct: CartProductModel }>()
);

export const addCartProductError = createAction(
  '[Add cart product effect] ADD_CART_PRODUCT_ERROR',
  props<{ error: Error | string }>()
);

export const getCartProductById = createAction(
  '[Product page] GET_CART_PRODUCT_BY_ID',
  props<{ id: number }>()
);

export const getCartProductByIdSuccess = createAction(
  '[Get cart product by id effect] GET_CART_PRODUCT_BY_ID_SUCCESS',
  props<{ cartProduct: CartProductModel }>()
);

export const getCartProductByIdError = createAction(
  '[Get cart product by id effect] GET_CART_PRODUCT_BY_ID_ERROR',
  props<{ error: Error | string }>()
);

export const deleteCartProducts = createAction(
  '[Cart page] DELETE_CART_PRODUCTS',
  props<{ cartProducts: CartProductModel[] }>()
);

export const deleteCartProductsSuccess = createAction(
  '[Delete cart products effect] DELETE_ALL_CART_PRODUCTS_SUCCESS',
);

export const deleteCartProductsError = createAction(
  '[Delete cart products effect] DELETE_ALL_CART_PRODUCTS_ERROR',
  props<{ error: Error | string }>()
);

export const confirmOrder = createAction(
  '[Cart page] CONFIRM_ORDER',
  props<{ orderId: number, cartProducts: CartProductModel[] }>()
);

