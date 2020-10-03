import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HighlightDirective} from './directives/highlight/highlight.directive';
import {RatingComponent} from './components/rating/rating.component';
import {ZoomDirective} from './directives/zoom/zoom.directive';
import {OrderByPipe} from './pipes/order-by/order-by.pipe';
import {FormsModule} from '@angular/forms';
import {ProductCardComponent} from './components/product-card/product-card.component';
import {RouterModule} from '@angular/router';

const declarations = [HighlightDirective, RatingComponent, ZoomDirective, OrderByPipe, ProductCardComponent];

@NgModule({
  declarations: [...declarations],
  imports: [CommonModule, RouterModule],
  exports: [...declarations, CommonModule, FormsModule]
})
export class SharedModule {
}
