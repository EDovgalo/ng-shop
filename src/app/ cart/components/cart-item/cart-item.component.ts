import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CartProductModel} from '../../models/cart-product.model';
import {ProductModel} from '../../../products/models/product.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemComponent implements OnInit {

  @Input() cartProduct: CartProductModel;
  @Output() deleteProduct: EventEmitter<CartProductModel> = new EventEmitter();
  @Output() increaseQuantity: EventEmitter<CartProductModel> = new EventEmitter();
  @Output() decreaseQuantity: EventEmitter<CartProductModel> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  onDeleteProduct(): void {
    this.deleteProduct.emit(this.cartProduct);
  }

  onIncreaseQuantity(): void {
    this.increaseQuantity.emit(this.cartProduct);
  }

  onDecreaseQuantity(): void {
    this.decreaseQuantity.emit(this.cartProduct);
  }

}
