import { Injectable } from '@angular/core';
import BaseItemDS from './base/baseItemDS';
import { isEmpty } from '../../utils/object';
import { NoticeApiService } from 'src/app/api/notice-api.service';
import NoticeDM from '../dataModels/noticeDM';

@Injectable({
  providedIn: 'root',
})
export class NoticeDS extends BaseItemDS<NoticeDM> {
  constructor(private noticeApiService: NoticeApiService) {
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
      const dates = await this.noticeApiService.ActiveNotices();
      await this.addOrReplaceItems(dates);
      return dates;
    } else {
      return this.items;
    }
  }
}
