import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {

  private symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  constructor() {
  }

  generate(n: number): string {
    // это не совсем случайная последовательность...
    return this.symbols.slice(0, n);
  }
}


