import {AfterViewInit, Component, OnInit} from '@angular/core';
import {OrdersService} from '../../services/orders.service';
import {OrderModel} from '../../models/order.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-order-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit, AfterViewInit {

  orders: OrderModel[];
  highlightOrderId: number;

  constructor(private ordersService: OrdersService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.orders = this.ordersService.getAllOrders() || [];
    this.highlightOrderId = +this.route.snapshot.queryParamMap.get('scrollTo');
  }

  ngAfterViewInit(): void {
    if (this.highlightOrderId) {
      this.scrollTo(this.highlightOrderId);
    }
  }

  private scrollTo(id): void {
    const el = document.getElementById(id);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({behavior: 'smooth'});
      });

    }
  }

}
