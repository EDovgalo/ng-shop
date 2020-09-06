import {Injectable} from '@angular/core';
import {LocalStorageService} from '../../core/services/local-storage/local-storage.service';
import {OrderModel} from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private readonly KEY = 'NG_SHOP_ORDERS';

  constructor(private localStorageService: LocalStorageService) {
  }

  createOrder(products): number {
    const userOrders = this.localStorageService.getItem(this.KEY) || [];
    const order = new OrderModel(products);
    userOrders.push(order);
    this.localStorageService.setItem(this.KEY, userOrders);
    return order.id;
  }

  getAllOrders(): OrderModel[] {
    return this.localStorageService.getItem(this.KEY);
  }

}
