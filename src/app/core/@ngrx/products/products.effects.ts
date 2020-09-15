import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import {map, pluck, switchMap} from 'rxjs/operators';

import * as ProductActions from './products.actions';
import {ProductPromiseService} from '../../../products/services/product-promise.service';
import {ToasterService} from '../../../widgets/services/toaster.service';
import * as RouterActions from '../router/router.actions';

@Injectable()
export class ProductsEffects {
  constructor(private actions$: Actions,
              private toasterService: ToasterService,
              private productsService: ProductPromiseService) {
  }

  getProducts$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.getProducts),
      switchMap(() =>
        this.productsService
          .getProducts()
          .then(products => ProductActions.getProductsSuccess({products}))
          .catch(error => ProductActions.getProductsError({error}))
      )
    );
  });

  deleteProduct$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      pluck('product'),
      switchMap(product =>
        this.productsService
          .deleteProduct(product)
          .then(() => {
            return ProductActions.deleteProductSuccess({product});
          })
          .catch(error => ProductActions.deleteProductError({error}))
      )
    );
  });

  addProduct$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.addProduct),
      pluck('product'),
      switchMap(newProduct =>
        this.productsService
          .addProduct(newProduct)
          .then(product => {
            const message = 'Product added successfully';
            this.toasterService.showMessage(message);
            return ProductActions.addProductSuccess({product});
          })
          .catch(error => ProductActions.addProductError({error}))
      )
    );
  });

  updateProduct$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      pluck('product'),
      switchMap(newProduct =>
        this.productsService
          .updateProduct(newProduct)
          .then(product => {
            const message = 'Product updated successfully';
            this.toasterService.showMessage(message);
            return ProductActions.updateProductSuccess({product});
          })
          .catch(error => ProductActions.updateProductError({error}))
      )
    );
  });

  getProductById$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.getProduct),
      pluck('id'),
      switchMap(id =>
        this.productsService
          .getProductById(id)
          .then(selectedProduct => {
            return ProductActions.getProductSuccess({selectedProduct});
          })
          .catch(error => ProductActions.getProductError({error}))
      )
    );
  });

  redirectOnProductsPage$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.updateProductSuccess, ProductActions.addProduct),
      map(() =>
        RouterActions.go({
          path: ['admin', 'products']
        })
      )
    );
  });
}
