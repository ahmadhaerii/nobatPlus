import { Injectable } from "@angular/core";
import BaseItemDS from "./base/baseItemDS";
import { CapacityApiService } from "src/app/api/capacity-api.service";
import { isEmpty } from "lodash";
import ServiceRoleDM from "../dataModels/serviceRoleDM";

@Injectable({
  providedIn: "root",
})
export class CapacityDS extends BaseItemDS<ServiceRoleDM> {
  constructor(private capacityApi: CapacityApiService) {
    super();
    this.onInitialization();
  }

  async onInitialization() {
    this.itemsWatch.subscribe((items) => {
      //
    });
  }

  async addRole(fromDate: string, toDate: string, hours: number[]) {
    return await this.capacityApi.AddRole(fromDate, toDate, hours);
  }

  async doLoad(force: boolean) {
    if (force || isEmpty(this.items)) {
      const dates = await this.capacityApi.CapacityList();
      return dates;
    } else {
      return this.items;
    }
  }
}
