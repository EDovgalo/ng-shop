import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreModule} from '../core/core.module';
import {AboutComponent} from './components/about/about.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  imports: [FormsModule, CommonModule, CoreModule],
  declarations: [AboutComponent],
  exports: [AboutComponent]
})
export class LayoutModule {

}
