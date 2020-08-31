import {Component, OnInit} from '@angular/core';
import {AuthService} from '../core/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isShowMessage = false;
  readonly message = 'incorrect login or password';

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  login(login, password): void {
    if (this.authService.login(login, password)) {
      this.router.navigateByUrl('admin');
    } else {
      this.isShowMessage = true;
    }
  }

}
