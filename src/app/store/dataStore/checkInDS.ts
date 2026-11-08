import { Injectable } from '@angular/core';
import BaseItemDS from './base/baseItemDS';
import { UserApiService } from 'src/app/api/user-api.service';
import CheckInDM from '../dataModels/checkInDM';
import { isEmpty } from 'lodash';
import { CheckInApiService } from 'src/app/api/checkin-api.service';

@Injectable({
  providedIn: 'root',
})
export class CheckInDS extends BaseItemDS<CheckInDM> {
  constructor(private checkInApi: CheckInApiService) {
    super();
    this.onInitialization();
  }

  async onInitialization() {
    this.itemsWatch.subscribe((items) => {
      //
    });
  }
  async checkInList(fromDate: string, toDate: string) {
    const users = await this.checkInApi.CheckInList(fromDate, toDate);
    await this.addOrReplaceItems(users);
    return users;
  }

  async cancelQueue(passingQueueID: string, description: string) {
    return await this.checkInApi.CancelQueue(passingQueueID, description)
  }

  async doLoad(force: boolean) {
    //
  }
}
