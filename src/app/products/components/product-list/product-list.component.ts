import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {ProductPromiseService} from '../../services/product-promise.service';
import {AppState} from '../../../core/@ngrx/app.state';
import {selectProducts} from '../../../core/@ngrx/products/products.selectors';
import {ProductModel} from '../../../shared/models/product.model';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products$: Observable<ProductModel[]>;


  constructor(private productPromiseService: ProductPromiseService,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.products$ = this.store.pipe(select(selectProducts));
  }
}
