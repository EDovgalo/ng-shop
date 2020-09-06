import {Component, OnInit} from '@angular/core';
import {ProductPromiseService} from '../../services/product-promise.service';
import {ProductModel} from '../../../shared/models/product.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ToasterService} from '../../../widgets/services/toaster.service';
import {Subscription} from 'rxjs';
import {CartService} from '../../../ cart/services/cart.service';
import {CartProductModel} from '../../../ cart/models/cart-product.model';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  product: ProductModel;
  private buySub$: Subscription;
  private isProductInCart: boolean;

  constructor(private productPromiseService: ProductPromiseService,
              private toasterService: ToasterService,
              private cartService: CartService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.loadProduct(id);
  }

  onBuy(): void {
    if (this.buySub$) {
      this.buySub$.unsubscribe();
    }

    const {name, description, price, isAvailable, rating, categories} = this.product;
    const cartProduct = new CartProductModel(null, name, description, price, isAvailable, rating, categories);

    this.buySub$ = this.cartService.addProduct(cartProduct)
      .subscribe(resp => {
        this.toasterService.showMessage('successful');
        this.router.navigateByUrl('/cart').then(() => this.buySub$.unsubscribe());
      }, error => this.errorHandler(error));
  }

  private loadProduct(id): void {
    this.productPromiseService.getProductById(id)
      .then(
        resp => this.product = resp
      ).catch((err) => {
        this.errorHandler(err);
      }
    );
    this.cartService.getProductById(id).then(resp => {
      this.isProductInCart = !!resp.id;
    });
  }

  private errorHandler(err): void {
    this.toasterService.showMessage(err.message || 'something went wrong try later', true);
    this.router.navigateByUrl('home');
  }
}
