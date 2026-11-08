import { UserLanguage } from 'src/app/services/label-manager.service';

export interface IQueueListByHour {
  titleCardTitle: string;
  titleCardDescription: string;
  contentCardTitle: string;
  search: string;
  filterButtonName: string;
  printButtonName: string;
  excelButtonName: string;
  addButtonName: string;
  tableHeaderUserQueueNumber: string;
  tableHeaderPsInfoID: string;
  tableHeaderPsMobileNo: string;
  tableHeaderPsFirstName: string;
  tableHeaderPsLastName: string;
  tableHeaderPassingRoleDate: string;
  tableHeaderPassingCheckedInDate: string;
  tableHeaderPassingExpireDate: string;
  tableHeaderStatusTitle: string;
  add: string;
  edit: string;
  delete: string;
  close: string;
  confirmDeleteText: string;
  confirmDeleteTitle: string;
  fromDate: string;
  toDate: string;
  refresh:string;
}

export const QueueListByHourLabels: Record<UserLanguage, IQueueListByHour> = {
  fa: {
    titleCardTitle: 'لیست نوبت',
    titleCardDescription: 'در این بخش، می توانید لیست عبور را مدیریت کنید. ',
    contentCardTitle: 'لیست نوبت',
    search: 'جستجو',
    filterButtonName: 'فیلتر',
    printButtonName: 'پرینت',
    excelButtonName: 'اکسل',
    addButtonName: 'جدید',
    tableHeaderUserQueueNumber: 'شماره نوبت',
    tableHeaderPsInfoID: 'کد ملی',
    tableHeaderPsMobileNo: 'شماره همراه',
    tableHeaderPsFirstName: 'نام',
    tableHeaderPsLastName: 'نام خانوادگی',
    tableHeaderPassingRoleDate: 'زمان مراجعه',
    tableHeaderPassingCheckedInDate: 'زمان عبور',
    tableHeaderPassingExpireDate: 'زمان ابطال',
    tableHeaderStatusTitle: 'وضعیت',
    edit: 'ویرایش  ',
    add: 'افزودن  ',
    delete: 'حذف',
    close: 'بستن',
    confirmDeleteText: 'از حذف   اطمینان دارید؟',
    confirmDeleteTitle: 'حذف  ',
    fromDate: 'از تاریخ',
    toDate: 'تا تاریخ',
    refresh:'به روز رسانی'
  },
  en: {
    tableHeaderPsInfoID: 'tableHeaderPsInfoID',
    titleCardTitle: 'Freight charge type',
    titleCardDescription:
      'In this section, you can manage the freight charge types. By clicking on any of the items, you can edit or delete it.',
    contentCardTitle: 'capacity list',
    search: 'Freight charge types search',
    filterButtonName: 'Filter',
    printButtonName: 'Print',
    excelButtonName: 'Excel',
    addButtonName: 'New',
    tableHeaderUserQueueNumber: 'tableHeaderUserQueueNumber',
    tableHeaderPsMobileNo: 'tableHeaderPsMobileNo',
    tableHeaderPsFirstName: 'tableHeaderPsFirstName',
    tableHeaderPsLastName: 'tableHeaderPsLastName',
    tableHeaderPassingRoleDate: 'tableHeaderPassingRoleDate',
    tableHeaderPassingCheckedInDate: 'tableHeaderPassingCheckedInDate',
    tableHeaderPassingExpireDate: 'tableHeaderPassingExpireDate',
    tableHeaderStatusTitle: 'tableHeaderStatusTitle',
    edit: 'edit',
    add: 'add',
    confirmDeleteText: 'Are you sure to delete?',
    confirmDeleteTitle: 'Delete the charge',
    close: 'close',
    delete: 'delete',
    fromDate: 'fromDate',
    toDate: 'toDate',
    refresh:'refresh'
  },
};
