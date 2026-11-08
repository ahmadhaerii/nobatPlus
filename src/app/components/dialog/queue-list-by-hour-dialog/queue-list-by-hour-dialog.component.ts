import { Component, Input } from '@angular/core';
import { COLUMNS_TYPES, TableKeys } from 'src/app/utils/constants';
import { BehaviorSubject, Subject } from 'rxjs';
import { LabelManagerService } from 'src/app/services/label-manager.service';
import * as XLSX from 'xlsx';
import {
  IQueueListByHour,
  QueueListByHourLabels,
} from './queue-list-by-hour-dialog.label';
import { QueueCS } from 'src/app/store/componentStore/queueCS';
import QueueDM from 'src/app/store/dataModels/queueDM';
import { NiraModalConfig } from 'nira-modal';

@Component({
  selector: 'app-queue-list-by-hour-dialog',
  templateUrl: './queue-list-by-hour-dialog.component.html',
  styleUrls: ['./queue-list-by-hour-dialog.component.scss'],
})
export class QueueListByHourDialogComponent {
  @Input() config!: NiraModalConfig;
  @Input() closeSubject!: Subject<any>;
  tableKey = TableKeys.QUEUE_LIST_BY_HOUR;
  labels: IQueueListByHour =
    this.labelManagerService.getLabels<IQueueListByHour>(QueueListByHourLabels);
  loading: boolean = false;
  tableData: BehaviorSubject<QueueDM[]> = new BehaviorSubject<QueueDM[]>([]);

  columnsSchema = [
    {
      key: 'userQueueNumber',
      type: COLUMNS_TYPES.TEXT,
      label: this.labels.tableHeaderUserQueueNumber,
      coptToClipboard: true,
    },
    {
      key: 'psInfoID',
      type: COLUMNS_TYPES.TEXT,
      label: this.labels.tableHeaderPsInfoID,
      coptToClipboard: true,
    },
    {
      key: 'psFirstName',
      type: COLUMNS_TYPES.TEXT,
      label: this.labels.tableHeaderPsFirstName,
    },
    {
      key: 'psLastName',
      type: COLUMNS_TYPES.TEXT,
      label: this.labels.tableHeaderPsLastName,
    },
    {
      key: 'psMobileNo',
      type: COLUMNS_TYPES.TEXT,
      label: this.labels.tableHeaderPsMobileNo,
    },
    {
      key: 'statusTitle',
      type: COLUMNS_TYPES.TEXT,
      label: this.labels.tableHeaderStatusTitle,
    },
    {
      key: 'passingRoleDate',
      type: COLUMNS_TYPES.MULTI_COLUMN,
      label: this.labels.tableHeaderPassingRoleDate,
      columns: [
        {
          key: 'passingRoleDate',
          type: COLUMNS_TYPES.TEXT,
          label: this.labels.tableHeaderPassingRoleDate,
        },
        {
          key: 'passingRoleTime',
          type: COLUMNS_TYPES.TEXT,
          label: this.labels.tableHeaderPassingRoleDate,
        },
      ],
    },
    {
      key: 'passingCheckedInDate',
      type: COLUMNS_TYPES.MULTI_COLUMN,
      label: this.labels.tableHeaderPassingCheckedInDate,
      columns: [
        {
          key: 'passingCheckedInDate',
          type: COLUMNS_TYPES.TEXT,
          label: this.labels.tableHeaderPassingCheckedInDate,
        },
        {
          key: 'passingCheckedInTime',
          type: COLUMNS_TYPES.TEXT,
          label: this.labels.tableHeaderPassingCheckedInDate,
        },
      ],
    },
    {
      key: 'passingExpireDate',
      type: COLUMNS_TYPES.MULTI_COLUMN,
      label: this.labels.tableHeaderPassingExpireDate,
      columns: [
        {
          key: 'passingExpireDate',
          type: COLUMNS_TYPES.TEXT,
          label: this.labels.tableHeaderPassingExpireDate,
        },
        {
          key: 'passingExpireTime',
          type: COLUMNS_TYPES.TEXT,
          label: this.labels.tableHeaderPassingExpireDate,
        },
      ],
    },
  ];

  constructor(
    private labelManagerService: LabelManagerService,
    private queueCS: QueueCS,
  ) {}

  async ngOnInit() {
    await this.getList();
  }

  async getList() {
    this.loading = true;
    try {
      const data = await this.queueCS.queueListByHour(
        this.config.data.passingRoleHourID,
      );
      this.tableData.next(data);
    } catch (error) {
      console.error(error);
    }
    this.loading = false;
  }

  exportExcel() {
    let element = document.getElementById('excel-table');

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'SheetJS.xlsx');
  }

  close() {
    this.closeSubject.next('true');
  }
}
