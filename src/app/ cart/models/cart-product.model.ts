import {ProductCategoryEnum, ProductModel} from '../../shared/models/product.model';

export class CartProductModel extends ProductModel {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: number,
    public isAvailable: boolean,
    public rating: number,
    public categories: ProductCategoryEnum[],
    public count: number = 1) {
      // то, что передается в super должно использоваться без public
      // технически это ни на что не влияет, но так более грамотно
    super(id, name, description, price, isAvailable, rating, categories);
  }
}
