import {Directive, ElementRef, HostBinding, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appZoom]'
})
export class ZoomDirective {

  private isZoom = false;
  @Input('appZoom') scale = '1.1';

  @HostListener('click') onClick(): void {
    this.isZoom = !this.isZoom;
    this.toggleZoom();
  }

  @HostListener('mouseenter') onMouseEnter(): void {
    this.toggleCursor();
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  private toggleCursor(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'cursor', this.isZoom ? 'zoom-out' : 'zoom-in');
  }

  private toggleZoom(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'transform', this.isZoom ? `scale(${this.scale})` : null);
    this.toggleCursor();
  }

}
