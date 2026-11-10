import { UserLanguage } from 'src/app/services/label-manager.service';

export interface IRegisterCrossing {
  fromDate: string;
  toDate: string;
  close: string;
  edit: string;
  add: string;
  contentCardTitle: string;
}

export const RegisterCrossingLabels: Record<UserLanguage, IRegisterCrossing> = {
  fa: {
    fromDate: 'از تاریخ',
    toDate: 'تا تاریخ',
    close: 'بستن',
    edit: 'ویرایش',
    add: 'ایجاد',
    contentCardTitle: 'مدیریت ظرفیت ها',
  },
  en: {
    fromDate: 'fromDate',
    toDate: 'toDate',
    close: 'close',
    edit: 'edit',
    add: 'add',
    contentCardTitle: 'capacity management',
  },
};
