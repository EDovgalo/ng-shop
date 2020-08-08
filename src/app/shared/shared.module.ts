import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HighlightDirective} from './directives/highlight/highlight.directive';
import {RatingComponent} from './components/rating/rating.component';
import {ZoomDirective} from './directives/zoom/zoom.directive';
import {OrderByPipe} from './pipes/order-by/oreder-by.pipe';
import {FormsModule} from '@angular/forms';

const declarations = [HighlightDirective, RatingComponent, ZoomDirective, OrderByPipe];

@NgModule({
  declarations: [...declarations],
  imports: [CommonModule],
  exports: [...declarations, CommonModule, FormsModule]
})
export class SharedModule {
}
