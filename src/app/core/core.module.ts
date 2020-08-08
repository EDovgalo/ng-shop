import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {APP_CONSTANTS, CONSTANTS} from './services/ constants/constants.service';
import {symbolGeneratorNFactory, symbolN5} from './services/generator/symbols-n5.factory';
import {GeneratorService} from './services/generator/generator.service';


@NgModule({
  declarations: [],
  providers: [
    {provide: APP_CONSTANTS, useValue: CONSTANTS},
    {provide: symbolN5, useFactory: symbolGeneratorNFactory(5), deps: [GeneratorService]}
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule {
}
