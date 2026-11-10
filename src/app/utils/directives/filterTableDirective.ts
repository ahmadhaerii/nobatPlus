import {
  Directive,
  ViewContainerRef,
  HostListener,
  ElementRef,
  Input,
  ComponentRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { NiraModalService } from 'nira-modal';
import { CoreTableFilterDialogComponent } from 'src/app/components/core/core-table/core-table-filter-dialog/core-table-filter-dialog/core-table-filter-dialog.component';
import { TableKeys } from '../constants';

@Directive({
  selector: '[filterTable]',
})
export class FilterTableDirective {
  constructor(
    public viewContainerRef: ViewContainerRef,
    private niraModalService: NiraModalService,
    private el: ElementRef
  ) {}

  @Input({ required: true }) columnsSchema: any;
  @Input({ required: false }) key: TableKeys | undefined;

  @HostListener('click', ['$event.target']) onClick() {
    this.openFilterDialog();
  }

  openFilterDialog() {
    this.niraModalService.open(CoreTableFilterDialogComponent, {
      data: { columnsSchema: this.columnsSchema, key: this.key },
    });
  }
}
