import {Injectable} from '@angular/core';
import {CategoryEnum, ProductModel} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsList: ProductModel[] = [
    new ProductModel(1, ' Washing Machine', 'Great Washing Machine',
      1, true, CategoryEnum.homeAppliances),
    new ProductModel(2, 'Pen', 'blue color', 2, true, CategoryEnum.officeSupplies),
    new ProductModel(3, 'Microwave', 'A good microwave will be able to make your life a little bit easier', 40,
      false, CategoryEnum.homeAppliances),
    new ProductModel(4, 'Toaster', 'The toaster isn’t necessarily an essential home appliance to own',
      10, true, CategoryEnum.homeAppliances),
    new ProductModel(5, 'pencil ', 'An artist\'s small, fine brush',
      1, false, CategoryEnum.officeSupplies),
  ];

  constructor() {
  }

  get products(): ProductModel[] {
    return this.productsList;
  }

}
