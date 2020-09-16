import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {filter, take, tap} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {selectCartProductsLoaded} from '../../core/@ngrx/cart/cart.selectors';
import * as CartAction from '../../core/@ngrx/cart/cart.actions';


@Injectable({
  providedIn: 'root'
})
export class LoadCartProductsGuard implements CanActivate {

  constructor(private store: Store) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.loadCartProducts();
  }

  private loadCartProducts(): Observable<boolean> {
    return this.store.pipe(
      select(selectCartProductsLoaded),
      tap((loaded: boolean) => {
        if (!loaded) {
          this.store.dispatch(CartAction.getCartProducts());
        }
      }),
      filter((loaded: boolean) => loaded),
      take(1)
    );
  }

}
