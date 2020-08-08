import {Directive, HostBinding, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @Input('appHighlight') highlightColor: string;
  @HostBinding('style.background-color') backgroundColor: string;

  constructor() {
  }

  @HostListener('mouseenter') onMouseEnter(): void {
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.backgroundColor = null;
  }

}
