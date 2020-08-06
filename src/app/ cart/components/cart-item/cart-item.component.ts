import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CartProductModel} from '../../models/cart-product.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemComponent implements OnInit {

  @Input() cartProduct: CartProductModel;
  @Output() deleteProduct: EventEmitter<CartProductModel> = new EventEmitter();
  @Output() changeQuantityProduct: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  onDeleteProduct(): void {
    this.deleteProduct.emit(this.cartProduct);
  }

  onChangeQuantityProduct(isDecreaseQuantity): void {
    this.changeQuantityProduct.emit({
      product: this.cartProduct,
      isDecreaseQuantity
    });
  }

}
