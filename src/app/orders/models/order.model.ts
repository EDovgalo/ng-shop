export class OrderProductModel {
  constructor(public productName: string,
              public count: number,
              public price: number) {
  }
}

export class OrderModel {

  public date = new Date().valueOf();
  public id: number;

  constructor(public products: OrderProductModel[]) {
    this.id = this.date;
  }
}
