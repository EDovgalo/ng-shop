import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {CardModeEnum, ProductModel} from '../../../shared/models/product.model';
import {CartService} from '../../../ cart/services/cart.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  product: ProductModel;
  cardModes = CardModeEnum;
  private routerParams$: Subscription;

  constructor(private productsService: ProductsService,
              private cartService: CartService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.routerParams$ = this.activatedRoute.paramMap.subscribe(result => {
      const id = result.get('id');
      this.product = this.productsService.getProductById(id) || {} as ProductModel;
    });
  }

  buyProduct(product: ProductModel): void {
    this.cartService.addProduct(product);
  }


}
