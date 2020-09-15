import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ProductModel} from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent implements OnInit {

  @Input() product: ProductModel;
  @Input() isShowAvailable = true;

  constructor() {
  }

  ngOnInit(): void {
  }

  get productCategories(): any {
    const {categories} = this.product;
    if (categories && categories.join) {
      return categories.join(', ');
    }
    return categories;
  }

}
