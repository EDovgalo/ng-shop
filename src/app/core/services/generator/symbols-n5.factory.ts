import {InjectionToken} from '@angular/core';
import {GeneratorService} from './generator.service';

export const symbolN5 = new InjectionToken<string>('symbol generator');

export function symbolGeneratorNFactory(count: number): any {
  return (generatorService: GeneratorService): string =>
    generatorService.generate(count);
}
