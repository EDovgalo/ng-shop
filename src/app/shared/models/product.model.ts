import {IProduct} from '../../core/@ngrx/products/products.actions';

export enum ProductCategoryEnum {
  homeAppliances = 'home appliances',
  officeSupplies = 'office supplies',
}

export class ProductModel implements IProduct {
  constructor(public id: number,
              public name: string,
              public description: string,
              public price: number,
              public isAvailable: boolean,
              public rating: number,
              public categories: ProductCategoryEnum[]) {
  }
}

