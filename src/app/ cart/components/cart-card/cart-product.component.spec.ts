import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CartCardComponent} from './cart-card.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

import {CartProductModel} from '../../models/cart-product.model';


describe('CartCardComponent', () => {
  let component: CartCardComponent;
  let fixture: ComponentFixture<CartCardComponent>;

  const mockProduct = {
    count: 5
  } as CartProductModel;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CartCardComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartCardComponent);
    component = fixture.componentInstance;
    component.product = mockProduct;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit product when calling to decrease product quantity', (done) => {
    component.decreaseQuantity.subscribe(value => {
      expect(mockProduct).toEqual(value);
      done();
    });
    component.onDecreaseQuantity();
  });

  it('should delete product', (done) => {
    component.deleteProduct.subscribe(value => {
      expect(mockProduct).toEqual(value);
      done();
    });
    component.onDeleteProduct();
  });


});
