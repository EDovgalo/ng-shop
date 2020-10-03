import {async, ComponentFixture, ComponentFixtureAutoDetect, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {LoginComponent} from './login.component';
import {Router} from '@angular/router';
import {AuthService} from '../core/services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const mockRouter = {
    navigateByUrl: jasmine.createSpy('navigateByUrl')
  };

  const mockAuthService = {
    login: jasmine.createSpy('login')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        {provide: Router, useValue: mockRouter},
        {provide: AuthService, useValue: mockAuthService},
        {provide: ComponentFixtureAutoDetect, useValue: true}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#login', () => {

    beforeEach(() => {
      const loginInput = fixture.debugElement.query(By.css('#login'));
      loginInput.nativeElement.value = 'login';
      const passwordInput = fixture.debugElement.query(By.css('#password'));
      passwordInput.nativeElement.value = '123';
      fixture.detectChanges();
    });

    it('should call authService.login with correctly params', () => {
      const btnLogin = fixture.debugElement.query(By.css('.btn-success'));
      btnLogin.nativeElement.click();
      expect(mockAuthService.login).toHaveBeenCalledWith('login', '123');
    });

    it('should redirect on admin page', () => {
      mockAuthService.login.and.returnValue(true);
      const btnLogin = fixture.debugElement.query(By.css('.btn-success'));
      btnLogin.nativeElement.click();
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('admin');
    });

    it('should show message if incorrect login or password', () => {
      mockAuthService.login.and.returnValue(false);
      const btnLogin = fixture.debugElement.query(By.css('.btn-success'));
      let message = fixture.debugElement.query(By.css('.text-danger'));
      expect(message).toBe(null);

      btnLogin.nativeElement.click();
      message = fixture.debugElement.query(By.css('.text-danger'));
      expect(message).toBeTruthy();
      expect(message.nativeElement.textContent).toContain(component.message);
    });


  });

});
