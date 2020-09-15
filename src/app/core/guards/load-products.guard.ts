import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {filter, take, tap} from 'rxjs/operators';
import * as ProductActions from '../@ngrx/products/products.actions';
import {selectProductsLoaded} from '../@ngrx/products/products.selectors';

@Injectable({
  providedIn: 'root'
})
export class LoadProductsGuard implements CanActivate {

  constructor(private store: Store) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.loadProducts();
  }

  private loadProducts(): Observable<boolean> {
    return this.store.pipe(
      select(selectProductsLoaded),
      tap((loaded: boolean) => {
        if (!loaded) {
          this.store.dispatch(ProductActions.getProducts());
        }
      }),
      filter((loaded: boolean) => loaded),
      take(1)
    );
  }

}
