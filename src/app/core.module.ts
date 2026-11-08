import { CoreAutoCompleteComponent } from "./components/core/core-auto-complete/core-auto-complete.component";
import { CoreBtnComponent } from "./components/core/core-btn/core-btn.component";
import { CoreCardComponent } from "./components/core/core-card/core-card.component";
import { CoreCheckboxComponent } from "./components/core/core-checkbox/core-checkbox.component";
import { CoreExpandableCardComponent } from "./components/core/core-expandable-card/core-expandable-card.component";
import { CoreInputComponent } from "./components/core/core-input/core-input.component";
import { CoreNumberStatusComponent } from "./components/core/core-number-status/core-number-status.component";
import { CorePageTitleComponent } from "./components/core/core-page-title/core-page-title.component";
import { CoreRadioButtonsComponent } from "./components/core/core-radio-buttons/core-radio-buttons.component";
import { CoreSearchBoxComponent } from "./components/core/core-search-box/core-search-box.component";
import { CoreSelectComponent } from "./components/core/core-select/core-select.component";
import { CoreSpinnerComponent } from "./components/core/core-spinner/core-spinner.component";
import { CoreSwitchComponent } from "./components/core/core-switch/core-switch.component";
import { CoreTextareaComponent } from "./components/core/core-textarea/core-textarea.component";
import { CoreTableNoContentComponent } from "./components/core/core-table/core-table-no-content/core-table-no-content.component";
import { CoreDatePickerComponent } from "./components/core/core-date-picker/core-date-picker.component";
import { CoreTableColumnManagerComponent } from "./components/core/core-table/core-table-column-manager/core-table-column-manager.component";
import { CoreTableActionColumnComponent } from "./components/core/core-table/core-table-action-column/core-table-action-column.component";
import { CoreTableComponent } from "./components/core/core-table/core-table/core-table.component";
import { CoreTableStatusColumnComponent } from "./components/core/core-table/core-table-status-column/core-table-status-column.component";
import { CoreTableActionButtonsColumnComponent } from "./components/core/core-table/core-table-action-buttons-column/core-table-action-buttons-column.component";
import { CoreTableRowSelectorColumnComponent } from "./components/core/core-table/core-table-row-selector-column/core-table-row-selector-column.component";
import { CoreTableShamsiDateComponent } from "./components/core/core-table/core-table-shamsi-date/core-table-shamsi-date.component";
import { CoreTableCardManagerComponent } from "./components/core/core-table/core-table-card-manager/core-table-card-manager.component";
import { CoreTableFilterDialogComponent } from "./components/core/core-table/core-table-filter-dialog/core-table-filter-dialog/core-table-filter-dialog.component";
import { CoreConfirmDialogComponent } from "./components/core/core-confirm-dialog/core-confirm-dialog.component";
import { CoreHourNumberComponent } from "./components/core/core-hour-number/core-hour-number.component";

export const declarationCores = [
  CoreAutoCompleteComponent,
  CoreBtnComponent,
  CoreCardComponent,
  CoreCheckboxComponent,
  CoreConfirmDialogComponent,
  CoreExpandableCardComponent,
  CoreInputComponent,
  CorePageTitleComponent,
  CoreRadioButtonsComponent,
  CoreSearchBoxComponent,
  CoreSelectComponent,
  CoreSpinnerComponent,
  CoreSwitchComponent,
  CoreTableActionColumnComponent,
  CoreTableColumnManagerComponent,
  CoreTableComponent,
  CoreTableStatusColumnComponent,
  CoreTextareaComponent,
  CoreTableNoContentComponent,
  CoreTableActionButtonsColumnComponent,
  CoreTableRowSelectorColumnComponent,
  CoreTableShamsiDateComponent,
  CoreTableCardManagerComponent,
  CoreTableFilterDialogComponent,
  CoreDatePickerComponent,
  CoreNumberStatusComponent,
  CoreHourNumberComponent,
];

/*
 * این کامپوننت‌ها در پروژه موجودند ولی هنوز در nobatPlus استفاده نمی‌شوند و
 * وابستگی‌هایشان (nira-modal، ngx-indexed-db، lodash، utils/constants، دیالوگ‌های ادمین و ...)
 * هنوز به پروژه اضافه نشده است. هر وقت لازم شدند، اینجا import و به آرایه بالا اضافه کنید:
 *
 *   core-date-picker (نیاز به NiraDatePickerModule)
 *   core-hour-number
 *   core-table و زیرکامپوننت‌هایش (core-table-*)
 */
