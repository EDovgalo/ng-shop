import {Action, createReducer, on} from '@ngrx/store';
import * as ProductsActions from './products.actions';
import {initialState, IProductState} from './products.state';
import {adapter} from './products.state';

const reducer = createReducer(
  initialState,
  on(ProductsActions.getProducts,
    state => ({
      ...state,
      selectedProduct: null,
      isLoaded: true
    })),
  on(ProductsActions.getProductsSuccess, (state, {products}) => {
    return adapter.setAll(products, {...state});
  }),
  on(ProductsActions.getProductsError,
    ProductsActions.updateProductError,
    ProductsActions.deleteProductError,
    ProductsActions.getProductError,
    (state, {error}) => {
      return {
        error,
        ...state
      };
    }),
  on(ProductsActions.deleteProductSuccess, (state) => {
    return {
      ...state
    };
  }),
  on(ProductsActions.deleteProduct,
    (state, {product}) => adapter.removeOne(product.id, {...state})
  ),
  on(ProductsActions.updateProductSuccess,
    (state, {product}) => adapter.updateOne({id: product.id, changes: product}, {...state})
  ),
  on(ProductsActions.addProductSuccess,
    (state, {product}) => adapter.addOne(product, {...state})),
  on(ProductsActions.getProductSuccess,
    (state, {selectedProduct}) => {
      return {
        ...state,
        selectedProduct
      };
    }),
);

export const productsReducer = (state: IProductState | undefined, action: Action) => {
  return reducer(state, action);
};
