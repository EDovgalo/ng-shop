export enum ProductCategoryEnum {
  homeAppliances = 'home appliances',
  officeSupplies = 'office supplies',
}

export enum CardModeEnum {
  VIEW = 1,
  BUY = 2,
}

export class ProductModel {
  constructor(public id: number,
              public name: string,
              public description: string,
              public price: number,
              public isAvailable: boolean,
              public rating: number,
              public categories: ProductCategoryEnum[]) {
  }
}

