import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderCardComponent} from './order-card.component';
import {OrderModel} from '../../models/order.model';
import {By} from '@angular/platform-browser';

describe('OrderCardComponent', () => {
  let component: OrderCardComponent;
  let fixture: ComponentFixture<OrderCardComponent>;

  const mockOrder = {
    products: [
      {price: 1, count: 2},
      {price: 2, count: 2}
    ]
  } as OrderModel;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCardComponent);
    component = fixture.componentInstance;
    component.order = mockOrder;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 2 orders', () => {
    const orders = fixture.debugElement.queryAll(By.css('ul'));
    expect(orders.length).toEqual(2);
  });

  it('should correctly render count products', () => {
    const footer = fixture.debugElement.query(By.css('.card-footer'));
    expect(footer.nativeElement.textContent).toEqual('total: 2');
  });

});
