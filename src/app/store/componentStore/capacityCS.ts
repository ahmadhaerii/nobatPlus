import { Injectable } from "@angular/core";
import { CapacityDS } from "../dataStore/capacityDS";
import { isEmpty } from "src/app/utils/object";

@Injectable({
  providedIn: "root",
})
export class CapacityCS {
  get itemsWatch() {
    return this.capacityDS.itemsWatch;
  }

  get items() {
    return this.capacityDS.items;
  }

  constructor(private capacityDS: CapacityDS) {
    this.onInitialization();
  }

  async onInitialization() {
    this.capacityDS.itemsWatch.subscribe((items) => {
      //
    });
  }

  async capacityList() {
    return await this.capacityDS.capacityList();
  }

  async addRole(fromDate: string, toDate: string, hours: number[]) {
    return await this.capacityDS.addRole(fromDate, toDate, hours);
  }

  async doLoad(force: boolean = false) {
    if (force || isEmpty(this.items)) {
      return await this.capacityDS.doLoad(true);
    } else {
      return this.items;
    }
  }
}
