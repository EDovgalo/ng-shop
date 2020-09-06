import {Component, OnInit} from '@angular/core';
import {ProductModel} from '../../../shared/models/product.model';
import {ProductPromiseService} from '../../services/product-promise.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Promise<ProductModel[]>;


  constructor(private productPromiseService: ProductPromiseService) {
  }

  ngOnInit(): void {
    this.products = this.productPromiseService.getProducts();
  }
}
