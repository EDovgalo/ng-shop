export class CartProductModel {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: number,
    public count: number = 1) {
  }
}
