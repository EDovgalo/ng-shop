import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AuthService} from '../../core/services/auth.service';
import * as RouterActions from '../../core/@ngrx/router/router.actions';

@Injectable({
  providedIn: 'root'
})
export class CanActivateAdminPageGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private store: Store,
              private authService: AuthService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActiveRoute();
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActiveRoute();
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActiveRoute();
  }

  private canActiveRoute(): any {
    if (this.authService.isLogin) {
      return true;
    }
    this.store.dispatch(RouterActions.go({
      path: ['/login'],
    }));
    return false;
  }


}
