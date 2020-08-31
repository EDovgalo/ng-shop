import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {CardModeEnum, ProductModel} from '../../../shared/models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Promise<ProductModel[]>;
  cardModes = CardModeEnum;

  constructor(private productsService: ProductsService) {
  }

  ngOnInit(): void {
    this.initProducts();
  }

  private initProducts(): void {
    this.products = this.productsService.products;
  }

}
