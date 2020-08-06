import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {IProductModel} from '../../models/product.model';
import {CartService} from '../../../ cart/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: IProductModel[];

  constructor(private productsService: ProductsService, private cartService: CartService) {
  }

  ngOnInit(): void {
    this.initProducts();
  }

  onBuy(productId): void {
    const product = this.productsService.buyProduct(productId);
    if (product) {
      this.cartService.addProduct(product);
      this.initProducts();
    }
  }

  private initProducts(): void {
    this.products = this.productsService.products;
  }

}
