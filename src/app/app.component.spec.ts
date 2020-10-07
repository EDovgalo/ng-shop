import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {DebugElement, Directive, Input, NO_ERRORS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {APP_CONSTANTS, CONSTANTS} from './core/services/ constants/constants.service';
import {AuthService} from './core/services/auth.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[routerLink]',
})
class RouterLinkStubDirective {
  // tslint:disable-next-line:no-input-rename
  @Input('routerLink') linkParams: any;
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let links: RouterLinkStubDirective[];
  let linkDes: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [AppComponent, RouterLinkStubDirective],
      providers: [{
        provide: APP_CONSTANTS,
        useValue: CONSTANTS
      }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));

    links = linkDes.map(
      d => d.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective
    );
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly set title', () => {
    const title = fixture.debugElement.query(By.css('h1'));
    expect(title.nativeElement.textContent).toEqual(CONSTANTS.APP);
  });

  it('should contains 4 links', () => {
    expect(links.length).toEqual(4);
  });

  it('should contains 3 links in correctly order', () => {
    expect(links[0].linkParams).toEqual('home');
    expect(links[1].linkParams).toEqual('cart');
    expect(links[2].linkParams).toEqual('orders');
  });

  it('should render link login if user logout', () => {
    expect(links[3].linkParams).toEqual('login');
  });

  it('should render link login if user logout', () => {
    expect(links[3].linkParams).toEqual('login');
  });

  it('should logout', () => {
    const loginService = fixture.debugElement.injector.get(AuthService);
    loginService.isLogin = true;
    fixture.detectChanges();
    const logoutBtn = fixture.debugElement.query(By.css('.btn'));
    logoutBtn.triggerEventHandler('click', null);
    expect(loginService.isLogin).toBeFalse();
  });


});
