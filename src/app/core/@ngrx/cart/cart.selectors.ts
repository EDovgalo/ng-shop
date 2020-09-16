import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppState} from '../app.state';
import {ICartState} from './cart.state';
import {selectRouteParam} from '../router/router.selectors';

export const selectCartState = createFeatureSelector<AppState, ICartState>('cart');

export const selectCartProductsEntities = createSelector(
  selectCartState,
  (state: ICartState) => state.entities
);

export const selectCartProducts = createSelector(
  selectCartProductsEntities,
  entities => Object.keys(entities).map(id => entities[+id])
);

export const selectCartTotalAmount = createSelector(
  selectCartState,
  state => state.totalAmount
);

export const selectCartQuantityProducts = createSelector(
  selectCartState,
  state => state.quantityProducts
);

export const selectCartProductById = createSelector(
  selectCartState,
  selectRouteParam('id'),
  (state, id) => state.entities[id]
);

export const selectCartProductsLoaded = createSelector(
  selectCartState,
  state => state.isLoaded
);

export const selectCartData = createSelector(
  selectCartProducts,
  selectCartTotalAmount,
  selectCartQuantityProducts,
  (cartProducts, totalAmount, quantityProducts) => (
    {
      cartProducts,
      totalAmount,
      quantityProducts
    }
  )
);
