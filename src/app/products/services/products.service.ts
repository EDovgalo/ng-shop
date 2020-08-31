import {Injectable} from '@angular/core';
import {ProductCategoryEnum, ProductModel} from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsList: ProductModel[] = [
    new ProductModel(1, ' Washing Machine', 'Great Washing Machine',
      1, true, ProductCategoryEnum.homeAppliances),
    new ProductModel(2, 'Pen', 'blue color', 2, true, ProductCategoryEnum.officeSupplies),
    new ProductModel(3, 'Microwave', 'A good microwave will be able to make your life a little bit easier', 40,
      false, ProductCategoryEnum.homeAppliances),
    new ProductModel(4, 'Toaster', 'The toaster isn’t necessarily an essential home appliance to own',
      10, true, ProductCategoryEnum.homeAppliances),
    new ProductModel(5, 'pencil ', 'An artist\'s small, fine brush',
      1, false, ProductCategoryEnum.officeSupplies),
  ];

  constructor() {
  }

  get products(): Promise<ProductModel[]> {
    return Promise.resolve(this.productsList);
  }

  getProductById(id): ProductModel {
    return this.productsList.find(item => item.id === +id);
  }

  addProduct(product: ProductModel): void {
    product.id = new Date().valueOf();
    this.productsList.push(product);
    this.productsList = [...this.productsList];
  }

  updateProduct(product: ProductModel): void {
    this.productsList = this.productsList.filter(item => item.id !== +product.id);
    this.productsList.push(product);
    this.productsList = [...this.productsList];
  }

}
