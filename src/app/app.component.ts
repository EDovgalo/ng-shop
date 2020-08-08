import {AfterContentInit, Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {APP_CONSTANTS, ConstantsService} from './core/services/ constants/constants.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit {

  @ViewChild('appTitle', {static: true}) private appTitle: ElementRef;

  constructor(@Inject(APP_CONSTANTS) private constants: ConstantsService) {
  }

  ngAfterContentInit(): void {
    this.appTitle.nativeElement.innerText = this.constants.APP;
  }
}
