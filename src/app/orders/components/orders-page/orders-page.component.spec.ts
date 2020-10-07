import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OrdersPageComponent} from './orders-page.component';
import {OrdersService} from '../../services/orders.service';
import {ActivatedRoute} from '@angular/router';
import {By} from '@angular/platform-browser';
import {OrderCardComponent} from '../order-card/order-card.component';

describe('OrderPageComponent', () => {
  let component: OrdersPageComponent;
  let fixture: ComponentFixture<OrdersPageComponent>;

  const mockOrdersService = {
    getAllOrders: jasmine.createSpy('getAllOrders').and.returnValue([
      {id: 1, products: []},
      {id: 2, products: []}
    ])
  };

  const mockActivatedRoute = {
    snapshot: {
      queryParamMap: {
        get: () => {
          return 1;
        }
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrdersPageComponent, OrderCardComponent],
      providers: [
        {provide: OrdersService, useValue: mockOrdersService},
        {provide: ActivatedRoute, useValue: mockActivatedRoute}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render order cards', () => {
    const orderCards = fixture.debugElement.queryAll(By.css('app-order-card'));
    expect(orderCards.length).toEqual(2);
  });

  it('should int highlightOrderId', () => {
    expect(component.highlightOrderId).toEqual(1);
  });

  it('should highlight first card', () => {
    const orderCards = fixture.debugElement.queryAll(By.css('app-order-card'));
    orderCards[0].nativeElement.classList.contains('highlight');
  });
});
