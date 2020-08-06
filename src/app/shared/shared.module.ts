import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { HighlightDirective } from './directives/highlight.directive';
import { RatingComponent } from './component/rating/rating.component';


@NgModule({
  declarations: [HighlightDirective, RatingComponent],
  imports: [
    CommonModule
  ],
    exports: [
        HighlightDirective,
        RatingComponent
    ]
})
export class SharedModule {
}
