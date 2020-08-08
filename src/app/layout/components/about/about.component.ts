import {Component, Inject, OnInit, Optional} from '@angular/core';
import {ConfigOptionsService} from '../../../core/services/config-options/config-options.service';
import {ConfigOptionsModel} from '../../../core/models/config-options.model';
import {APP_CONSTANTS, ConstantsService} from '../../../core/services/ constants/constants.service';
import {symbolN5} from '../../../core/services/generator/symbols-n5.factory';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  userConfig = {} as ConfigOptionsModel;

  constructor(private configOptions: ConfigOptionsService,
              @Optional() @Inject(symbolN5) public symbols,
              @Optional() @Inject(APP_CONSTANTS) private constants: ConstantsService) {
  }

  ngOnInit(): void {
    this.userConfig = this.configOptions.getConfig() || {};
  }

  onSaveConfig(): void {
    this.configOptions.setConfig(this.userConfig);
  }

  get appVersion(): string {
    return this.constants ? this.constants.VER : '1.0';
  }

}
