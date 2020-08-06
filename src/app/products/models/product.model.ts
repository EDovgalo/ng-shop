export enum CategoryEnum {
  homeAppliances = 'home appliances',
  officeSupplies = 'office supplies',
}

export class ProductModel {
  constructor(public id: number,
              public name: string,
              public description: string,
              public price: number,
              public isAvailable: boolean,
              public category: CategoryEnum) {
  }
}
