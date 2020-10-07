import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductCardComponent} from './product-card.component';
import {ProductModel} from '../../models/product.model';
import {By} from '@angular/platform-browser';
import {RatingComponent} from '../rating/rating.component';

describe('ProductComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  const mockProduct = {
    name: 'test',
    isAvailable: false,
    categories: ['1', '2'] as any,
  } as ProductModel;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductCardComponent, RatingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.product = {...mockProduct};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render name', () => {
    const name = fixture.debugElement.query(By.css('h4'));
    expect(name.nativeElement.textContent).toBe('test');
  });

  it('should render "not available" if product.isAvailable is false ', () => {
    const label = fixture.debugElement.query(By.css('h5'));
    expect(label.nativeElement.textContent).toEqual('not available');
  });

  it('should return correctly categories if it array', () => {
    expect(component.productCategories).toBe('1, 2');
  });

  it('should return correctly categories if it string', () => {
    component.product.categories = 'test' as any;
    expect(component.productCategories).toBe('test');
  });


});
