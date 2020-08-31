import {Inject, Injectable, Optional} from '@angular/core';
import {LocalStorageService} from '../local-storage/local-storage.service';
import {ConfigOptionsModel} from '../../models/config-options.model';
import {APP_CONSTANTS, ConstantsService} from '../ constants/constants.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigOptionsService {

  private appId: string;
  private config: ConfigOptionsModel;

  constructor(private localStorageService: LocalStorageService,
              @Optional() @Inject(APP_CONSTANTS) private constants: ConstantsService) {
    this.initConfig();
  }

  setConfig(config: ConfigOptionsModel): void {
    Object.assign(this.config, config);
    this.localStorageService.setItem(this.appId, JSON.stringify(this.config));
  }

  getConfig(): ConfigOptionsModel {
    return this.config;
  }

  private initConfig(): void {
    this.appId = this.constants ? this.constants.APP : 'ng-shop';
    this.config = this.localStorageService.getItem(this.appId);
  }

}
