import { Injectable } from '@angular/core';
import BaseItemDS from './base/baseItemDS';
import HelpDM from '../dataModels/helpDM';
import { isEmpty } from 'lodash';
import { HelpApi } from 'src/app/api/help-api.service';

@Injectable({
  providedIn: 'root',
})
export class HelpDS extends BaseItemDS<HelpDM> {
  constructor(private helpApi: HelpApi) {
    super();
    this.onInitialization();
  }

  async onInitialization() {
    this.itemsWatch.subscribe((items) => {
      //
    });
  }

  async doLoad(force: boolean) {
    if (force || isEmpty(this.items)) {
      const dates = await this.helpApi.Help();
      return dates;
    } else {
      return this.items;
    }
  }
}
