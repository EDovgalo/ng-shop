import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CardModeEnum, ProductModel} from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent implements OnInit {

  @Input() product: ProductModel;
  @Input() mode?: CardModeEnum;
  @Output() buy: EventEmitter<ProductModel> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  onBuy(): void {
    this.buy.emit(this.product);
  }

  get isViewMode(): boolean {
    return this.mode === CardModeEnum.VIEW;
  }

  get isViewBuy(): boolean {
    return this.mode === CardModeEnum.BUY;
  }

}
