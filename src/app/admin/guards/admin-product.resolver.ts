import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {from, Observable, of} from 'rxjs';
import {ProductModel} from '../../shared/models/product.model';
import {ProductPromiseService} from '../../products/services/product-promise.service';
import {delay, map, take} from 'rxjs/operators';
import {ToasterService} from '../../widgets/services/toaster.service';

@Injectable({
  providedIn: 'root'
})
export class AdminProductResolver implements Resolve<ProductModel> {

  constructor(private productsService: ProductPromiseService,
              private toasterService: ToasterService,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<ProductModel> | Promise<ProductModel> | ProductModel {
    if (!route.paramMap.has('id')) {
      return of({} as ProductModel);
    }
    const id = +route.paramMap.get('id');
    return from(this.productsService.getProductById(id)).pipe(
      delay(3000),
      map((product: ProductModel) => {
        if (product) {
          return product;
        } else {
          this.toasterService.showMessage('Product doesnt exists', true);
          this.router.navigate(['/admin']);
          return null;
        }
      }),
      take(1)
    );
  }
}
