import {Injectable, InjectionToken} from '@angular/core';

export class ConstantsService {

  readonly APP = 'Shop';
  readonly VER = '2.0';
  readonly API_URL = 'http://ng-shop.com';

  constructor() {
  }
}

export const CONSTANTS = new ConstantsService();
export const APP_CONSTANTS = new InjectionToken<ConstantsService>('constants');
