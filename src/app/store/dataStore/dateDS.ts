import { Injectable } from '@angular/core';
import BaseItemDS from './base/baseItemDS';
import { isEmpty } from '../../utils/object';
import { DateApiService } from 'src/app/api/date-api.service';
import DateDM from '../dataModels/dateDM';

@Injectable({
  providedIn: 'root',
})
export class DateDS extends BaseItemDS<DateDM> {
  constructor(private dateApi: DateApiService) {
    super();
    this.onInitialization();
  }

  async onInitialization() {
    this.itemsWatch.subscribe((items) => {
      //
    });
  }

  async dateDetails(passingRoleDateID: string) {
    return await this.dateApi.DateDetails(passingRoleDateID);
  }

  async AddPsQueue(
    passingRoleHourID: string,
    psMobileNo: string,
    nationalID: string,
    captchaCode: string,
    hiddenToken: string
  ) {
    return await this.dateApi.AddPsQueue(
      passingRoleHourID,
      psMobileNo,
      nationalID,
      captchaCode,
      hiddenToken
    );
  }

  async addPsQueueNoCaptcha(
    passingRoleHourID: string,
    nationalID: string
  ) {
    return await this.dateApi.addPsQueueNoCaptcha(
      passingRoleHourID,
      nationalID
    );
  }

  async ConfirmMobileNo(confirmCode: number, passingQueueID: number) {
    return await this.dateApi.ConfirmMobileNo(confirmCode, passingQueueID);
  }

  async CheckExchange(psInfoID: string, passingRoleHourID: string) {
    return await this.dateApi.CheckExchange(psInfoID, passingRoleHourID);
  }

  async Exchange(
    confirmCode: number,
    passingQueueID: number,
    passingRoleHourID: string
  ) {
    return await this.dateApi.Exchange(
      confirmCode,
      passingQueueID,
      passingRoleHourID
    );
  }

  async doLoad(force: boolean) {
    if (force || isEmpty(this.items)) {
      this.deleteAllItems();
      const dates = await this.dateApi.DateList();
      await this.addOrReplaceItems(dates);
      return dates;
    } else {
      return this.items;
    }
  }
}
