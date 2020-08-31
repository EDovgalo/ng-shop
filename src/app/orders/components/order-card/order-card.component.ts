import {Component, Input, OnInit} from '@angular/core';
import {OrderModel} from '../../models/order.model';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {

  @Input() order = {} as OrderModel;

  constructor() {
  }

  ngOnInit(): void {
  }

  get totalSum(): number {
    return this.order.products.reduce((acc, item) => {
      return acc + item.price * item.count;
    }, 0);
  }

}
