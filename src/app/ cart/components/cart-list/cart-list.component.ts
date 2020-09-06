import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {Subscription} from 'rxjs';
import {CartProductModel} from '../../models/cart-product.model';
import {OrdersService} from '../../../orders/services/orders.service';
import {Router} from '@angular/router';
import {ToasterService} from '../../../widgets/services/toaster.service';
import {CartDataModel} from '../../models/cart-data.model';
import {AppSettingsService} from '../../../core/services/app-settings/app-settings.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit, OnDestroy {

  cartData = {} as CartDataModel;
  sortFields = ['price', 'count', 'name'];
  products: CartProductModel[];
  settings = {
    sortBy: null,
    isSortAsc: null,
  };
  private productsSub$: Subscription;
  private settingsSub$: Subscription;

  constructor(private cartService: CartService,
              private router: Router,
              private toaster: ToasterService,
              private appSettingsService: AppSettingsService,
              private orderService: OrdersService) {
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadSettings();
  }

  ngOnDestroy(): void {
    this.unsubscribeProducts();
    this.unsubscribeSettings();
  }

  onCreateOrder(): void {
    this.cartService.deleteAll().then(() => {
      this.toaster.showMessage('order has been confirmed');
      const orderId = this.orderService.createOrder(this.cartData.products);
      this.router.navigate(['orders'], {queryParams: {scrollTo: orderId}});
    });
  }

  deleteProduct(product: CartProductModel): void {
    this.productsSub$ = this.cartService.deleteProduct(product).subscribe(resp => {
      this.cartData = {} as CartDataModel;
      this.toaster.showMessage('product has been deleted');
    });
  }

  increaseQuantity(product: CartProductModel): void {
    const updateProduct = {...product};
    updateProduct.count++;
    this.unsubscribeProducts();
    this.productsSub$ = this.cartService.updateProduct(updateProduct).subscribe(resp => {
      this.cartData = resp;
    });
  }

  decreaseQuantity(product: CartProductModel): void {
    const updateProduct = {...product};
    updateProduct.count--;
    this.unsubscribeProducts();
    this.productsSub$ = this.cartService.updateProduct(updateProduct).subscribe(resp => {
      this.cartData = resp;
    });
  }

  get isCartHasProduct(): number {
    return this.cartData && this.cartData.products && this.cartData.products.length;
  }

  saveFilters(key, value): void {
    this.appSettingsService.saveSettings(key, value);
  }

  private loadProducts(): void {
    this.productsSub$ = this.cartService.getProducts()
      .subscribe(resp => {
        this.cartData = resp;
      });
  }

  private loadSettings(): void {
    this.settingsSub$ = this.appSettingsService.getSettings().subscribe(result => {
      this.settings.sortBy = result.sortBy;
      this.settings.isSortAsc = result.isSortAsc;
    });
  }

  private unsubscribeProducts(): void {
    if (this.productsSub$) {
      this.productsSub$.unsubscribe();
    }
  }

  private unsubscribeSettings(): void {
    if (this.settingsSub$) {
      this.settingsSub$.unsubscribe();
    }
  }

}
