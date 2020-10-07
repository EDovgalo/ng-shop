import {AfterViewInit, Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {APP_CONSTANTS, ConstantsService} from './core/services/ constants/constants.service';
import {Router} from '@angular/router';
import {AuthService} from './core/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

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
