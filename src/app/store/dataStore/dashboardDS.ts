import { Injectable } from '@angular/core';
import BaseItemDS from './base/baseItemDS';
import { isEmpty } from '../../utils/object';
import DateDM from '../dataModels/dateDM';
import { DashboardApiService } from 'src/app/api/dashboard-api.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardDS extends BaseItemDS<DateDM> {
  constructor(private dashboardApi: DashboardApiService) {
    super();
    this.onInitialization();
  }

  async onInitialization() {
    this.itemsWatch.subscribe((items) => {
      //
    });
  }

  async lastStatus() {
    return await this.dashboardApi.LastStatus();
  }
  async waitingList() {
    return await this.dashboardApi.WaitingList();
  }
  async passingDateStatus() {
    return await this.dashboardApi.PassingDateStatus();
  }
  async doLoad(force: boolean) {
    if (force || isEmpty(this.items)) {
      const dates = await this.dashboardApi.WaitingList();
      return dates;
    } else {
      return this.items;
    }
  }
}
