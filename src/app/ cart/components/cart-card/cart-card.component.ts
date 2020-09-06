import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CartProductModel} from '../../models/cart-product.model';
import {ProductModel} from '../../../shared/models/product.model';

@Component({
  selector: 'app-cart-card',
  templateUrl: 'cart-card.component.html',
  styleUrls: ['cart-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartCardComponent implements OnInit {

  @Input() product: CartProductModel;
  @Output() deleteProduct: EventEmitter<CartProductModel> = new EventEmitter();
  @Output() increaseQuantity: EventEmitter<CartProductModel> = new EventEmitter();
  @Output() decreaseQuantity: EventEmitter<CartProductModel> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  onDeleteProduct(): void {
    this.deleteProduct.emit(this.product);
  }

  onIncreaseQuantity(): void {
    this.increaseQuantity.emit(this.product);
  }

  onDecreaseQuantity(): void {
    this.decreaseQuantity.emit(this.product);
  }

}
