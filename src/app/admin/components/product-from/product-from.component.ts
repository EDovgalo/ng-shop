import {Component, OnInit} from '@angular/core';
import {ProductCategoryEnum, ProductModel} from '../../../shared/models/product.model';
import {ActivatedRoute, Router} from '@angular/router';
import {pluck} from 'rxjs/operators';
import {ProductPromiseService} from '../../../products/services/product-promise.service';
import {ToasterService} from '../../../widgets/services/toaster.service';

@Component({
  selector: 'app-add-edit-product-from',
  templateUrl: './product-from.component.html',
  styleUrls: ['./product-from.component.scss']
})
export class ProductFromComponent implements OnInit {

  productCategories = this.initProductCategories();
  product = {} as ProductModel;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private toasterService: ToasterService,
              private productsService: ProductPromiseService) {
  }

  ngOnInit(): void {
    this.route.data.pipe(pluck('product')).subscribe((product: ProductModel) => {
      this.product = {...product};
    });
  }

  onSave(): void {
    const product = {...this.product};
    const request = this.product.id ? this.productsService.updateProduct(product) :
      this.productsService.addProduct(product);

    request.then(() => {
      const message = `${this.product.id ? 'Update' : 'Add'} successful`;
      this.toasterService.showMessage(message);
      this.router.navigate(['admin', 'products']);
    }).catch((err) => {
      this.toasterService.showMessage(err.message || 'something went wrong try later');
      this.router.navigate(['admin', 'products']);
    });
  }

  private initProductCategories(): any {
    return Object.entries(ProductCategoryEnum).map(item => {
      return {key: item[0], value: item[1]};
    });
  }

}
