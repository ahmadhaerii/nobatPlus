import { Component, Input } from '@angular/core';
import { forEach } from 'lodash';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { IModal, NiraModalConfig } from 'nira-modal';
import { BehaviorSubject, Subject } from 'rxjs';
import { TableKeys } from 'src/app/utils/constants';

@Component({
  selector: 'app-core-table-filter-dialog',
  templateUrl: './core-table-filter-dialog.component.html',
  styleUrls: ['./core-table-filter-dialog.component.scss'],
})
export class CoreTableFilterDialogComponent implements IModal {
  @Input() closeSubject!: Subject<any>;
  @Input() config!: NiraModalConfig;
  key!: TableKeys;
  columnsSchema: any[] = [];
  dbTableFilter: any;
  constructor(private dbService: NgxIndexedDBService) {}
  ngOnInit() {
    this.columnsSchema = this.config.data.columnsSchema;
    this.key = this.config.data.key;
    this.getDbTableFilter();
  }

  onCheckboxClicked(selectedColumn: any, event: any) {
    this.columnsSchema.map((column) => {
      if (selectedColumn.key === column.key) {
        column.active = event.srcElement.checked;
      }
      return column;
    });
    setTimeout(() => {
      this.saveTableFilter();
    }, 50);
  }

  getDbTableFilter() {
    this.dbService
      .getByIndex('tableFilter', 'key', this.key)
      .subscribe((data) => {
        this.dbTableFilter = data;
        if (this.dbTableFilter) {
          this.setTableFilter();
        }
      });
  }
  saveTableFilter() {
    const data: any = {
      key: this.key,
      columnsSchema: JSON.stringify(this.columnsSchema),
    };
    if (this.dbTableFilter) {
      data.id = this.dbTableFilter.id;
      this.dbService.update('tableFilter', data).subscribe(() => {});
    } else {
      this.dbService.add('tableFilter', data).subscribe(() => {
        this.getDbTableFilter();
      });
    }
  }

  setTableFilter() {
    this.columnsSchema.map((column: any) => {
      JSON.parse(this.dbTableFilter.columnsSchema).forEach(
        (dbColumnsSchema: any) => {
          if (dbColumnsSchema.key === column.key) {
            column.active = dbColumnsSchema.active;
          }
        }
      );
      return column;
    });
  }

  submitBtn() {
    this.closeSubject.next('');
  }
  close() {
    this.closeSubject.next('');
  }
}
