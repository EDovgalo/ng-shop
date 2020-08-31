import {Component, OnInit} from '@angular/core';
import {OrdersService} from '../../services/orders.service';
import {OrderModel} from '../../models/order.model';

@Component({
  selector: 'app-order-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit {

  orders: OrderModel[];

  constructor(private ordersService: OrdersService) {
  }

  ngOnInit(): void {
    this.orders = this.ordersService.getAllOrders() || [];
  }

}
