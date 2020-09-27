import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {merge, Observable, of} from 'rxjs';
import {Action, Store} from '@ngrx/store';
import {catchError, concatMap, map, pluck, switchMap} from 'rxjs/operators';

import {CartService} from '../../../ cart/services/cart.service';
import {CartProductModel} from '../../../ cart/models/cart-product.model';
import * as CartActions from './cart.actions';
import * as RouterActions from '../router/router.actions';
import {ToasterService} from '../../../widgets/services/toaster.service';


@Injectable()
export class CartEffects {
  constructor(private actions$: Actions,
              private store: Store,
              private toasterService: ToasterService,
              private cartService: CartService) {
  }

  getCartProducts$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.getCartProducts),
      switchMap(() =>
        this.cartService.getProducts()
          .pipe(
            map(cartProducts => CartActions.getCartProductsSuccess({cartProducts})),
            catchError(error => of(CartActions.getCartProductsError({error})))
          )
      )
    )
  );

  updateCartProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.updateCartProduct),
      pluck('cartProduct'),
      concatMap((cartProduct: CartProductModel) =>
        this.cartService.updateProduct(cartProduct).pipe(
          map(updatedCartProduct => {
            return CartActions.updateCartProductSuccess({cartProduct: updatedCartProduct});
          }),
          catchError(error => of(CartActions.updateCartProductError({error})))
        )
      )
    )
  );

  deleteCartProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.deleteCartProduct),
      pluck('cartProduct'),
      concatMap((cartProduct: CartProductModel) =>
        this.cartService.deleteProduct(cartProduct).pipe(
          map(() => {
            return CartActions.deleteCartProductSuccess({cartProduct});
          }),
          catchError(error => of(CartActions.deleteCartProductError({error})))
        )
      )
    )
  );

  addCartProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addCartProduct),
      pluck('cartProduct'),
      concatMap((cartProduct: CartProductModel) =>
        this.cartService.addProduct(cartProduct).pipe(
          map(newCartProduct => {
            return CartActions.addCartProductSuccess({cartProduct: newCartProduct});
          }),
          catchError(error => of(CartActions.addCartProductError({error})))
        )
      )
    )
  );

  getCartProductById$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.getCartProductById),
      pluck('id'),
      switchMap((id: number) =>
        this.cartService.getProductById(id).pipe(
          map(cartProduct => {
            return CartActions.getCartProductByIdSuccess({cartProduct});
          }),
          catchError(() => of(CartActions.getCartProductByIdSuccess({cartProduct: null})))
        )
      )
    )
  );

  addCartProductSuccess$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(CartActions.addCartProductSuccess),
      map(() => {
        this.toasterService.showMessage('add successful');
        return RouterActions.go({
          path: ['/cart']
        });
      })
    );
  });

  confirmOrder$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(CartActions.confirmOrder),
      concatMap(({orderId, cartProducts}) => [
        RouterActions.go({path: ['orders'], queryParams: {scrollTo: orderId}}),
        CartActions.deleteCartProducts({cartProducts})
      ])
    );
  });

  deleteCartProducts$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(CartActions.deleteCartProducts),
      pluck('cartProducts'),
      concatMap((cartProducts) => {
        return merge(...cartProducts.map(item => this.cartService.deleteProduct(item)))
          .pipe(
            map(() => CartActions.deleteCartProductsSuccess()),
            catchError(error => of(CartActions.deleteCartProductsError({error})))
          );
      }),
    );
  });
}

