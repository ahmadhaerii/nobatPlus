import { Injectable } from "@angular/core";
import BaseItemDS from "./base/baseItemDS";
import { CapacityApiService } from "src/app/api/capacity-api.service";
import CapacityDM from "../dataModels/capacityDM";

@Injectable({
  providedIn: "root",
})
export class CapacityDS extends BaseItemDS<CapacityDM> {
  constructor(private capacityApi: CapacityApiService) {
    super();
    this.onInitialization();
  }

  async onInitialization() {
    this.itemsWatch.subscribe((items) => {
      //
    });
  }

  async capacityList() {
    return await this.capacityApi.CapacityList();
  }

  async addRole(fromDate: string, toDate: string, hours: number[]) {
    return await this.capacityApi.AddRole(fromDate, toDate, hours);
  }

  async doLoad(force: boolean) {
    //
  }
}
