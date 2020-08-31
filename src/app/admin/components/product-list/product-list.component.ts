import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../../products/services/products.service';
import {ProductModel} from '../../../shared/models/product.model';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Promise<ProductModel[]>;

  constructor(private productsService: ProductsService) {
  }

  ngOnInit(): void {
    this.products = this.productsService.products;
  }

}
