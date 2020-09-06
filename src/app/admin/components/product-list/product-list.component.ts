import {Component, OnInit} from '@angular/core';
import {ProductPromiseService} from '../../../products/services/product-promise.service';
import {ProductModel} from '../../../shared/models/product.model';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Promise<ProductModel[]>;

  constructor(private productsService: ProductPromiseService) {
  }

  ngOnInit(): void {
    this.products = this.productsService.getProducts();
  }

  onDelete(product): void {
    this.productsService.deleteProduct(product).then(resp => {
      this.products = this.productsService.getProducts();
    });
  }

}
