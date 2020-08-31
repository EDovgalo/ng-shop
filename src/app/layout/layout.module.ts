import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreModule} from '../core/core.module';
import {AboutComponent} from './components/about/about.component';
import {FormsModule} from '@angular/forms';
import {NotFoundPageComponent} from './components/not-found-page/not-found-page.component';


@NgModule({
  imports: [FormsModule, CommonModule, CoreModule],
  declarations: [AboutComponent, NotFoundPageComponent],
  exports: [AboutComponent]
})
export class LayoutModule {

}
