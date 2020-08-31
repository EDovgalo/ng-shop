import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userLogin = 'admin';
  private password = 123;
  isLogin = false;

  constructor() {
  }


  login(login, password): boolean {
    if (this.userLogin === login && this.password === +password) {
      this.isLogin = true;
    }
    return this.isLogin;
  }

  logout(): void {
    this.isLogin = false;
  }

}
