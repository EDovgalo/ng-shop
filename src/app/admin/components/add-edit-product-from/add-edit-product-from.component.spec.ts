import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProductFromComponent } from './add-edit-product-from.component';

describe('AddEditProductFromComponent', () => {
  let component: AddEditProductFromComponent;
  let fixture: ComponentFixture<AddEditProductFromComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditProductFromComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditProductFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
