import {Injectable} from '@angular/core';
import {map, take} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

import {ProductModel} from '../../shared/models/product.model';
import {ToasterService} from '../../widgets/services/toaster.service';
import {selectSelectedProduct} from '../../core/@ngrx/products/products.selectors';
import * as RouterActions from '../../core/@ngrx/router/router.actions';

@Injectable({
  providedIn: 'root'
})
export class AdminProductResolver implements Resolve<ProductModel> {

  constructor(
    private toasterService: ToasterService,
    private store: Store) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<ProductModel> {
    return this.store.pipe(
      select(selectSelectedProduct),
      map((product: ProductModel) => {
        if (product) {
          return product;
        } else {
          this.toasterService.showMessage('product doesnt exist', true);
          this.store.dispatch(RouterActions.go({path: ['/login']}));
          return null;
        }
      }),
      take(1),
    );
  }
}
