import {AfterContentInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit {

  @ViewChild('appTitle', {static: true}) private appTitle: ElementRef;
  title = 'shop';

  ngAfterContentInit(): void {
    this.appTitle.nativeElement.innerText = this.title;
  }
}
