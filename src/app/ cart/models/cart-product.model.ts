import {ProductCategoryEnum, ProductModel} from '../../shared/models/product.model';

export class CartProductModel extends ProductModel {
  constructor(
    id: number,
    name: string,
    description: string,
    price: number,
    isAvailable: boolean,
    rating: number,
    categories: ProductCategoryEnum[],
    public count: number = 1) {
    super(id, name, description, price, isAvailable, rating, categories);
  }
}
