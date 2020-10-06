import {TestBed} from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController, TestRequest
} from '@angular/common/http/testing';

import {CartService} from './cart.service';
import {CartProductModel} from '../models/cart-product.model';

describe('CartService', () => {
  let httpTestingController: HttpTestingController;
  let service: CartService;

  const mockProducts = [{id: 1}, {id: 2}] as CartProductModel[];

  const mockProduct = {id: 22, name: 'test'} as CartProductModel;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CartService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get products', () => {
    service.getProducts().subscribe((value) => {
      expect(value).toEqual(mockProducts);
    });
    const mockRequest: TestRequest = httpTestingController.expectOne('http://localhost:3000/cart');
    expect(mockRequest.request.method).toEqual('GET');
    mockRequest.flush(mockProducts);
  });

  it('should get product by id', () => {
    service.getProductById(mockProduct.id).subscribe((value) => {
      expect(value).toEqual(mockProduct);
    });
    const mockRequest: TestRequest = httpTestingController.expectOne(`http://localhost:3000/cart/${mockProduct.id}`);
    expect(mockRequest.request.method).toEqual('GET');
    mockRequest.flush(mockProduct);
  });

  it('should update product', () => {
    service.updateProduct(mockProduct).subscribe((value) => {
      expect(value).toEqual(mockProduct);
    });
    const mockRequest: TestRequest = httpTestingController.expectOne(`http://localhost:3000/cart/${mockProduct.id}`);
    expect(mockRequest.request.method).toEqual('PUT');
    mockRequest.flush(mockProduct);
  });

  it('should create product', () => {
    service.addProduct(mockProduct).subscribe((value) => {
      expect(value).toEqual(mockProduct);
    });
    const mockRequest: TestRequest = httpTestingController.expectOne(`http://localhost:3000/cart`);
    expect(mockRequest.request.method).toEqual('POST');
    mockRequest.flush(mockProduct);
  });

  it('should delete product', () => {
    service.deleteProduct(mockProduct).subscribe((value) => {
      expect(value).toEqual(mockProduct);
    });
    const mockRequest: TestRequest = httpTestingController.expectOne(`http://localhost:3000/cart/${mockProduct.id}`);
    expect(mockRequest.request.method).toEqual('DELETE');
    mockRequest.flush(mockProduct);
  });

  it('should correctly handle error', () => {
    service.deleteProduct(mockProduct).subscribe((value) => {
      expect(value).toEqual(mockProduct);
    }, err => {
      console.log(err);
      expect(err.statusText).toBe('Server Error');
    });
    const mockRequest: TestRequest = httpTestingController.expectOne(`http://localhost:3000/cart/${mockProduct.id}`);
    expect(mockRequest.request.method).toEqual('DELETE');
    mockRequest.flush('error', {
      status: 500,
      statusText: 'Server Error'
    });
  });

});
