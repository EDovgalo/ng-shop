import {async, ComponentFixture, ComponentFixtureAutoDetect, TestBed} from '@angular/core/testing';

import {ProductPageComponent} from './product-page.component';
import {of} from 'rxjs';
import {Store} from '@ngrx/store';
import {IProduct} from '../../../core/@ngrx/products/products.actions';
import {ProductCardComponent} from '../../../shared/components/product-card/product-card.component';
import {RatingComponent} from '../../../shared/components/rating/rating.component';
import {By} from '@angular/platform-browser';
import createSpy = jasmine.createSpy;
import {CartProductModel} from '../../../ cart/models/cart-product.model';
import {ProductCategoryEnum} from '../../../shared/models/product.model';

describe('ProductPageComponent', () => {
  let component: ProductPageComponent;
  let fixture: ComponentFixture<ProductPageComponent>;

  const product = {
    name: 'test name',
    description: 'test',
    price: 12,
    isAvailable: true,
    rating: 4,
    categories: 'one'
  };

  let mockStore = null;

  beforeEach(async(() => {

    mockStore = {
      pipe: jasmine.createSpy('pipe').and.returnValues(of({
        product,
        isProductInCart: false
      })),
      dispatch: createSpy('dispatch')
    };

    TestBed.configureTestingModule({
      declarations: [ProductPageComponent, ProductCardComponent, RatingComponent],
      providers: [
        {provide: Store, useValue: mockStore},
        {provide: ComponentFixtureAutoDetect, useValue: true}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should render product cart component', () => {
    const productCard = fixture.debugElement.query(By.css('app-product-card'));
    expect(productCard).toBeTruthy();
  });

  it('should show button buy if product is not in cart', () => {
    const btn = fixture.debugElement.query(By.css('.btn-success'));
    expect(btn).toBeTruthy();
  });

  it('should call store.dispatch with correctly params', () => {
    const btn = fixture.debugElement.query(By.css('.btn-success'));
    btn.nativeElement.click();
    expect(mockStore.dispatch).toHaveBeenCalledWith({
      cartProduct: new CartProductModel(null, 'test name', 'test', 12, true, 4, 'one' as any, 1),
      type: '[Product page] ADD_CART_PRODUCT'
    });
  });

  it('should not show button buy if product is in cart', () => {
    component.isProductInCart = true;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('.btn-success'));
    expect(btn).toEqual(null);
  });


})
;
