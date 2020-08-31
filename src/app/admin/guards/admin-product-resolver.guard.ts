import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {ProductModel} from '../../shared/models/product.model';
import {ProductsService} from '../../products/services/products.service';
import {delay, map, take} from 'rxjs/operators';
import {ToasterService} from '../../widgets/services/toaster.service';

@Injectable({
  providedIn: 'root'
})
export class AdminProductResolverGuard implements Resolve<ProductModel> {

  constructor(private productsService: ProductsService,
              private toasterService: ToasterService,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<ProductModel> | Promise<ProductModel> | ProductModel {
    if (!route.paramMap.has('id')) {
      return of(new ProductModel(null, ',', '', null, null, null));
    }
    const id = +route.paramMap.get('id');
    return of(this.productsService.getProductById(id)).pipe(
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
