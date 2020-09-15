import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {CartProductModel} from '../models/cart-product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly URL = ' http://localhost:3000/cart';

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<CartProductModel[]> {
    return this.http.get<CartProductModel[]>(this.URL)
      .pipe(
        catchError(this.handlerError)
      );
  }

  getProductById(id): Observable<any> {
    const url = `${this.URL}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handlerError)
    );
  }

  addProduct(product): Observable<CartProductModel> {
    return this.http.post(this.URL, product)
      .pipe(
        catchError(this.handlerError)
      );
  }

  deleteProduct(product): Observable<CartProductModel> {
    const url = `${this.URL}/${product.id}`;
    return this.http.delete(url, product)
      .pipe(
        catchError(this.handlerError)
      );
  }

  updateProduct(product): Observable<CartProductModel> {
    const url = `${this.URL}/${product.id}`;
    return this.http.put(url, product)
      .pipe(
        catchError(this.handlerError)
      );
  }

  private handlerError(err): Promise<any> {
    console.error('An error occurred', err);
    return Promise.reject(err);
  }

}
