import {Component, OnInit} from '@angular/core';
import {ProductCategoryEnum, ProductModel} from '../../../shared/models/product.model';
import {ActivatedRoute, Router} from '@angular/router';
import {pluck} from 'rxjs/operators';
import {ProductsService} from '../../../products/services/products.service';
import {ToasterService} from '../../../widgets/services/toaster.service';

@Component({
  selector: 'app-add-edit-product-from',
  templateUrl: './add-edit-product-from.component.html',
  styleUrls: ['./add-edit-product-from.component.scss']
})
export class AddEditProductFromComponent implements OnInit {

  productCategories = this.initProductCategories();
  product = {} as ProductModel;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private toasterService: ToasterService,
              private productsService: ProductsService) {
  }

  ngOnInit(): void {
    this.route.data.pipe(pluck('product')).subscribe((product: ProductModel) => {
      this.product = {...product};
    });
  }

  onSave(): void {
    if (this.product.id) {
      this.productsService.updateProduct(this.product);
    } else {
      this.productsService.addProduct(this.product);
    }
    const message = `${this.product.id ? 'Update' : 'Add'} successful`;
    this.toasterService.showMessage(message);
    this.router.navigate(['admin', 'products']);
  }

  private initProductCategories(): any {
    return Object.entries(ProductCategoryEnum).map(item => {
      return {key: item[0], value: item[1]};
    });
  }

}
