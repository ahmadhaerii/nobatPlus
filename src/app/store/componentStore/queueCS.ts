import { Injectable } from '@angular/core';
import { isEmpty } from '../../utils/object';
import { QueueDS } from '../dataStore/queueDS';

@Injectable({
  providedIn: 'root',
})
export class QueueCS {
  get itemsWatch() {
    return this.queueDS.itemsWatch;
  }

  get items() {
    return this.queueDS.items;
  }

  constructor(private queueDS: QueueDS) {
    this.onInitialization();
  }

  async onInitialization() {
    this.queueDS.itemsWatch.subscribe((items) => {
      //
    });
  }

  async queueListByDate(passingRoleDateID: string, status: string) {
    return await this.queueDS.queueListByDate(passingRoleDateID, status);
  }

  async queueListByHour(passingRoleHourCode: string) {
    return await this.queueDS.queueListByHour(passingRoleHourCode);
  }

  async addManualQueue(
    psMobileNo: string,
    passingRoleHourID: string,
    psFirstName: string,
    psLastName: string,
    psFatherName: string,
    psInfoID: string,
    passengers:any
  ) {
    return await this.queueDS.addManualQueue(
      psMobileNo,
      passingRoleHourID,
      psFirstName,
      psLastName,
      psFatherName,
      psInfoID,
      passengers
    );
  }

  async manualQueueList(fromDate: string, toDate: string) {
    return await this.queueDS.manualQueueList(fromDate, toDate);
  }

  async invalidPSInfo(passingQueueID: string) {
    await this.queueDS.invalidPSInfo(passingQueueID);
    this.queueDS.removeItem(passingQueueID);
    return 'done';
  }

  async lastPsQueueListDoLoad(force: boolean = false) {
    if (force || isEmpty(this.items)) {
      return await this.queueDS.lastPsQueueListDoLoad(true);
    } else {
      return this.items;
    }
  }
}
