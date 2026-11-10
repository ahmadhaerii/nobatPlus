import { Injectable } from "@angular/core";
import BaseItemDS from "./base/baseItemDS";
import { isEmpty } from "../../utils/object";
import { QueueApiService } from "src/app/api/queue-api.service";
import PassengerInfoDM from "../dataModels/passengerInfoDM";

@Injectable({
  providedIn: "root",
})
export class QueueDS extends BaseItemDS<PassengerInfoDM> {
  constructor(private queueApi: QueueApiService) {
    super();
    this.onInitialization();
  }

  async onInitialization() {
    this.itemsWatch.subscribe((items) => {
      //
    });
  }

  async queueListByDate(passingRoleDateID: string, status: string) {
    return await this.queueApi.QueueListByDate(passingRoleDateID, status);
  }

  async queueListByHour(passingRoleHourCode: string) {
    return await this.queueApi.QueueListByHour(passingRoleHourCode);
  }

  async addManualQueue(
    psMobileNo: string,
    passingRoleHourID: string,
    psFirstName: string,
    psLastName: string,
    psFatherName: string,
    psInfoID: string,
    passengers: any,
  ) {
    return await this.queueApi.AddManualQueue(
      psMobileNo,
      passingRoleHourID,
      psFirstName,
      psLastName,
      psFatherName,
      psInfoID,
      passengers,
    );
  }

  async manualQueueList(fromDate: string, toDate: string) {
    return await this.queueApi.ManualQueueList(fromDate, toDate);
  }

  async invalidPSInfo(passingQueueID: string) {
    return await this.queueApi.InvalidPSInfo(passingQueueID);
  }

  async lastPsQueueListDoLoad(force: boolean) {
    if (force || isEmpty(this.items)) {
      const lastPsQueueList = await this.queueApi.LastPsQueueList();
      await this.deleteAllItems();
      await this.addOrReplaceItems(lastPsQueueList);
      return lastPsQueueList;
    } else {
      return this.items;
    }
  }

  async doLoad(force: boolean) {
    //
  }
}
