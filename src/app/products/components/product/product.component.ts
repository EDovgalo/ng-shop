import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductModel} from '../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {

  @Input() product: ProductModel;
  @Output() buy: EventEmitter<ProductModel> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  onBuy(): void {
    this.buy.emit(this.product);
  }

}
