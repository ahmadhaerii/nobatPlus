export enum IconInput {
  Password = 'Password',
  Text = 'Text',
  EmailPhone = 'EmailPhone',
  Phone = 'Phone',
  Editable = 'Editable',
  Verified = 'Verified',
  NotVerified = 'NotVerified',
  OwnerName = 'OwnerName',
  totalAmount = 'totalAmount',
  totalRows = 'totalRows',
  Date = 'Date',
}

export enum COLUMNS_TYPES {
  TEXT = 'text',
  NUMBER = 'number',
  SELECTOR = 'selector',
  ROW_SELECTOR = 'row-selector',
  STATUS = 'status',
  ACTION = 'action',
  ACTION_BUTTONS = 'action-buttons',
  SHAMSI_DATE = 'shamsi-date',
  MULTI_COLUMN = 'multiColumn',
}

export enum TOAST_MESSAGES {
  SUCCESSFUL_CREATE = 'با موفقیت ثبت شد',
  SUCCESSFUL_ADDED = 'با موفقیت اضافه شد',
  SUCCESSFUL_EDIT = 'با موفقیت ویرایش شد',
  SUCCESSFUL_DELETED = 'با موفقیت حذف شد ',
}

export const travelTypes = [
  {
    title: 'داخلی',
    value: 'Domestic',
  },
  {
    title: 'بین المللی',
    value: 'International',
  },
];
export const countryCodes = [
  {
    countryId: 'IR',
    countryNameFa: 'ايران',
    countryNameEn: 'Iran',
  },
];
export const priceTypes = [
  {
    currencyId: 'IRR',
    currencyNameEn: 'Iranian Rial',
    currencyNameFa: 'ریال ایران',
  },
];
export const YES_NO_OPTIONS = [
  {
    title: 'بله',
    value: true,
  },
  {
    title: 'خیر',
    value: false,
  },
];
export const ACTIVE_OPTIONS = [
  {
    title: 'فعال',
    value: true,
  },
  {
    title: 'غیر فعال',
    value: false,
  },
];

export enum TableKeys {
  CROSSING_LIST = 'crossingList',
  CAPACITY_LIST = 'capacityList',
  QUEUE_LIST_BY_DATE = 'queueListByDate',
  QUEUE_LIST_BY_HOUR = 'queueListByHour',
  MANUAL_QUEUE_LIST = 'manualQueueList',
  INFO_BY_MOBILE_NO_LIST = 'infoByMobileNoList',
}
