import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {ProductListComponent} from './product-list.component';
import {Store} from '@ngrx/store';
import {from, of} from 'rxjs';
import {ProductCardComponent} from '../../../shared/components/product-card/product-card.component';
import {RatingComponent} from '../../../shared/components/rating/rating.component';
import {RouterModule} from '@angular/router';
import {By} from '@angular/platform-browser';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  const mockProducts = of([{}, {}]);

  const mockStore = {
    pipe: jasmine.createSpy('pipe').and.returnValue(mockProducts)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ProductListComponent, ProductCardComponent, RatingComponent],
      providers: [{provide: Store, useValue: mockStore}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly init products$', () => {
    expect(component.products$).toEqual(mockProducts);
  });

  it('should render 2 products card', () => {
    const products = fixture.debugElement.queryAll(By.css('app-product-card'));
    expect(products.length).toEqual(2);
  });

});
