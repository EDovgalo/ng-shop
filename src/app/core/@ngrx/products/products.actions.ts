import {createAction, props} from '@ngrx/store';
import {ProductCategoryEnum, ProductModel} from '../../../shared/models/product.model';

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  isAvailable: boolean;
  rating: number;
  categories: ProductCategoryEnum[];
}

export const getProducts = createAction(
  '[Home/ Admin page] Get products'
);

export const getProductsSuccess = createAction(
  '[Get products effect] GET_PRODUCTS_SUCCESS',
  props<{ products: ProductModel[] }>()
);

export const getProductsError = createAction(
  '[Get products effect] GET_PRODUCTS_ERROR',
  props<{ error: Error | string }>()
);

export const addProduct = createAction(
  '[Admin page] Add product',
  props<{ product: ProductModel }>()
);

export const addProductSuccess = createAction(
  '[Add product effect] ADD_PRODUCT',
  props<{ product: ProductModel }>()
);

export const addProductError = createAction(
  '[Add product effect] ADD_ERROR',
  props<{ error: Error | string }>()
);

export const getProduct = createAction(
  '[Admin/Product page] Get product',
  props<{ id: number }>()
);

export const getProductSuccess = createAction(
  '[Get product effect] GET_PRODUCT_SUCCESS',
  props<{ selectedProduct: ProductModel }>()
);

export const getProductError = createAction(
  '[Get product effect] GET_PRODUCT_ERROR',
  props<{ error: Error | string }>()
);

export const deleteProduct = createAction(
  '[Admin page] Delete product',
  props<{ product: ProductModel }>()
);

export const deleteProductSuccess = createAction(
  '[Delete product effect] DELETE_PRODUCT_SUCCESS',
  props<{ product: ProductModel }>()
);

export const deleteProductError = createAction(
  '[Delete product effect] DELETE_PRODUCT_ERROR',
  props<{ error: Error | string }>()
);

export const updateProduct = createAction(
  '[Admin page] Update product',
  props<{ product: ProductModel }>()
);

export const updateProductSuccess = createAction(
  '[Update product effect] DELETE_PRODUCT_SUCCESS',
  props<{ product: ProductModel }>()
);

export const updateProductError = createAction(
  '[Update product effect] DELETE_PRODUCT_ERROR',
  props<{ error: Error | string }>()
);
