import {Injectable} from '@angular/core';
import {ProductModel} from '../../shared/models/product.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductPromiseService {

  private readonly URL = ' http://localhost:3000/products';

  constructor(private http: HttpClient) {
  }

  getProducts(): Promise<ProductModel[]> {
    return this.http.get(this.URL)
      .toPromise()
      .catch(this.handlerError);
  }

  getProductById(id: number): Promise<ProductModel> {
    const url = `${this.URL}/${id}`;
    return this.http.get(url)
      .toPromise()
      .catch(this.handlerError);
  }

  addProduct(product: ProductModel): Promise<ProductModel> {
    const options = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    const body = JSON.stringify(product);
    return this.http.post(this.URL, body, options)
      .toPromise()
      .catch(this.handlerError);
  }

  deleteProduct(product: ProductModel): Promise<ProductModel[]> {
    const url = `${this.URL}/${product.id}`;
    return this.http.delete(url)
      .toPromise()
      .catch(this.handlerError);
  }

  updateProduct(product: ProductModel): Promise<ProductModel> {
    const options = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    const url = `${this.URL}/${product.id}`;
    const body = JSON.stringify(product);
    return this.http.put(url, body, options)
      .toPromise()
      .catch(this.handlerError);
  }

  private handlerError(err): Promise<any> {
    console.error('An error occurred', err);
    return Promise.reject(err);
  }


}
