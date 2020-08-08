import {Pipe, PipeTransform} from '@angular/core';
import {CartProductModel} from '../../../ cart/models/cart-product.model';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value = [], sortBy: string, isSortAsc: boolean): unknown {
    value.sort((a, b) => {
      if (a[sortBy] > b[sortBy]) {
        return isSortAsc ? 1 : -1;
      }
      if (a[sortBy] < b[sortBy]) {
        return isSortAsc ? -1 : 1;
      }
      return 0;
    });
    return value;
  }

}
