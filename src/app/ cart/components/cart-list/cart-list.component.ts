import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {CartDataModel} from '../../models/cart-data.model';
import {Subscription} from 'rxjs';
import {CartProductModel} from '../../models/cart-product.model';
import {ProductModel} from '../../../shared/models/product.model';
import {OrdersService} from '../../../orders/services/orders.service';
import {OrderProductModel} from '../../../orders/models/order.model';
import {Router} from '@angular/router';
import {ToasterService} from '../../../widgets/services/toaster.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit, OnDestroy {

  cartInfo: CartDataModel = {} as CartDataModel;
  sortFields = ['price', 'count', 'name'];
  sortBy = this.sortFields[0];
  isSortAsc = false;
  cartProducts: CartProductModel[] = [];

  private cartInfoSub: Subscription;

  constructor(private cartService: CartService,
              private router: Router,
              private toaster: ToasterService,
              private orderService: OrdersService) {
  }

  ngOnInit(): void {
    this.cartInfoSub = this.cartService.channel$.subscribe(cartInfo => {
      this.cartInfo = cartInfo || {} as CartDataModel;
      this.cartProducts = this.cartInfo.cartProducts;
    });
  }

  ngOnDestroy(): void {
    this.cartInfoSub.unsubscribe();
  }

  onCreateOrder(): void {
    const order = this.cartProducts.map(item => new OrderProductModel(item.name, item.count, item.price));
    this.orderService.createOrder(order);
    this.cartService.resetCart();
    this.toaster.showMessage('Order confirmed');
    this.router.navigateByUrl('orders');
  }

  deleteProduct(product: CartProductModel): void {
    this.cartService.deleteProduct(product);
  }

  increaseQuantity(product: CartProductModel): void {
    this.cartService.increaseQuantity(product);
  }

  decreaseQuantity(product: CartProductModel): void {
    this.cartService.decreaseQuantity(product);
  }

}
