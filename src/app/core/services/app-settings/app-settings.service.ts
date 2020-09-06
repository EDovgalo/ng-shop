import {Injectable} from '@angular/core';
import {LocalStorageService} from '../local-storage/local-storage.service';
import {HttpAppSettingsService} from './http-app-settings.service';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  private readonly KEY = 'NG_SHOP_SETTINGS';

  constructor(private localStorageService: LocalStorageService,
              private httpAppSettingsService: HttpAppSettingsService) {
  }

  getSettings(): Observable<any> {
    const result = this.localStorageService.getItem(this.KEY);
    if (!result) {
      return this.httpAppSettingsService.getSettings();
    }
    return of(result);
  }

  saveSettings(key, value): void {
    const result = this.localStorageService.getItem(this.KEY) || {};
    result[key] = value;
    this.localStorageService.setItem(this.KEY, result);
  }

}
