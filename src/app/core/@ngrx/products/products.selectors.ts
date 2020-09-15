import {createFeatureSelector, createSelector} from '@ngrx/store';

import {adapter} from './products.state';
import {AppState} from '../app.state';
import {IProductState} from './products.state';
import {selectRouteParam} from '../router/router.selectors';
import {selectCartProductById} from '../cart/cart.selectors';

export const selectProductsState = createFeatureSelector<AppState, IProductState>('products');

export const {
  selectEntities: selectEntities,
  selectAll: selectProducts
} = adapter.getSelectors(selectProductsState);


export const selectSelectedProduct = createSelector(
  selectEntities,
  selectRouteParam('id'),
  (products, id) => products[id]
);

export const selectProductCartProduct = createSelector(
  selectSelectedProduct,
  selectCartProductById,
  (product, cartProduct) => ({product, cartProduct})
);

export const selectProductsLoaded = createSelector(
  selectProductsState,
  (state) => state.isLoaded
);
