import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HighlightDirective} from './directives/highlight/highlight.directive';
import {RatingComponent} from './component/rating/rating.component';
import { ZoomDirective } from './directives/zoom/zoom.directive';


@NgModule({
  declarations: [HighlightDirective, RatingComponent, ZoomDirective],
  imports: [
    CommonModule
  ],
  exports: [
    HighlightDirective,
    RatingComponent,
    ZoomDirective
  ]
})
export class SharedModule {
}
