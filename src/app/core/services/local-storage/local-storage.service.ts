import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storage = window.localStorage;

  constructor() {
  }

  setItem(key, value): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  getItem(key): any {
    return JSON.parse(this.storage.getItem(key));
  }

  removeItem(key): void {
    this.storage.removeItem(key);
  }

}
