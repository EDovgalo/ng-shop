import {Injectable} from '@angular/core';
import {IProductModel} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private products: IProductModel[] = [
    {id: 1, name: 'BMW', description: 'car', price: 1000},
    {id: 2, name: 'BMX', description: 'bicycle', price: 500},
    {id: 3, name: 'Volvo', description: 'car', price: 1500},
  ];

  constructor() {
  }

  getProducts(): IProductModel[] {
    return this.products;
  }

  buyProduct(productId): IProductModel {
    const product = this.products.find(productItem => productItem.id === productId);
    this.removeProduct(productId);
    return product;
  }

  private removeProduct(productId): void {
    this.products = this.products.filter(product => product.id !== productId);
  }

}
