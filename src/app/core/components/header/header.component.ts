import {AfterViewInit, Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {APP_CONSTANTS, ConstantsService} from '../../services/ constants/constants.service';
import {CartService} from '../../../ cart/services/cart.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {

  @ViewChild('appTitle', {static: true}) private appTitle: ElementRef;

  constructor(@Inject(APP_CONSTANTS) private constants: ConstantsService,
              private router: Router,
              public authService: AuthService) {
  }

  ngAfterViewInit(): void {
    this.appTitle.nativeElement.innerText = this.constants.APP;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('home');
  }

}
