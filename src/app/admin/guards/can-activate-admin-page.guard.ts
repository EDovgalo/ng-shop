import {Injectable} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivateChild,
  CanLoad,
  UrlSegment, Route
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateAdminPageGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private router: Router,
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
    const redirectUrl = this.router.parseUrl('login');
    return redirectUrl;
  }


}
