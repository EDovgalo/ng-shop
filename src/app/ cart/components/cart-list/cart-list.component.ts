import {Component, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
  }

  get isShowProductList(): boolean {
    return this.cartService.purchasedProducts && this.cartService.purchasedProducts.length > 0;
  }

}
