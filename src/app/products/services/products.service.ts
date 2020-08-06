import {Injectable} from '@angular/core';
import {IProductModel} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsList: IProductModel[] = [
    {id: 1, name: 'BMW', description: 'car', price: 1000},
    {id: 2, name: 'BMX', description: 'bicycle', price: 500},
    {id: 3, name: 'Volvo', description: 'car', price: 1500},
  ];

  constructor() {
  }

  get products(): IProductModel[] {
    return this.productsList;
  }

  buyProduct(productId): IProductModel {
    const product = this.productsList.find(productItem => productItem.id === productId);
    this.removeProduct(productId);
    return product;
  }

  private removeProduct(productId): void {
    this.productsList = this.productsList.filter(product => product.id !== productId);
  }

}
