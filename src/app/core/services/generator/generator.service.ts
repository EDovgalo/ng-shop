import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {

  private symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  constructor() {
  }

  generate(n: number): string {
    const randomNumber =  Math.floor(Math.random() * Math.floor(n));
    return this.symbols.slice(0, randomNumber);
  }
}


