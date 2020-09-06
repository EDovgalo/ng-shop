import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, concatMap, switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {ProductModel} from '../../shared/models/product.model';
import {CartProductModel} from '../models/cart-product.model';
import {CartDataModel} from '../models/cart-data.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly URL = ' http://localhost:3000/cart';

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<CartDataModel> {
    return this.http.get<CartProductModel[]>(this.URL)
      .pipe(
        switchMap(resp => {
          return of(new CartDataModel(resp, this.getTotalAmount(resp), this.getProductCount(resp)));
        }),
        catchError(this.handlerError));
  }

  getProductById(id): Promise<any> {
    const url = `${this.URL}/${id}`;
    return this.http.get(url).toPromise().catch(() => Promise.resolve({}));
  }

  addProduct(product): Observable<CartDataModel> {
    return this.http.post(this.URL, product)
      .pipe(
        catchError(this.handlerError)
      );
  }

  async deleteAll(): Promise<any> {
    const resp = await this.getProducts().toPromise();
    return Promise.all(resp.products.map(item => this.http.delete(`${this.URL}/${item.id}`).toPromise()));
  }

  deleteProduct(product): Observable<CartDataModel> {
    const url = `${this.URL}/${product.id}`;
    return this.http.delete(url, product)
      .pipe(
        concatMap(() => this.getProducts()),
        catchError(this.handlerError)
      );
  }

  updateProduct(product): Observable<CartDataModel> {
    const url = `${this.URL}/${product.id}`;
    return this.http.put(url, product)
      .pipe(
        concatMap(() => this.getProducts()),
        catchError(this.handlerError)
      );
  }

  private getTotalAmount(arr): number {
    return arr.reduce((acc, item) => {
      return acc + item.price * item.count;
    }, 0);
  }

  private getProductCount(arr): number {
    return arr.reduce((acc, item) => {
      return acc + item.count;
    }, 0);
  }

  private handlerError(err): Promise<any> {
    console.error('An error occurred', err);
    return Promise.reject(err);
  }

}
