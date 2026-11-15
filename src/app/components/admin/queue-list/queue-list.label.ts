import { UserLanguage } from "src/app/services/label-manager.service";

export interface IQueueList {
  chassis: string;
  carType: string;
  mobileNo: string;
  status: string;
  serviceRoleDate: string;
  serviceCheckedInDate: string;
  cancelDate: string;

  titleCardTitle: string;
  titleCardDescription: string;
  contentCardTitle: string;
  search: string;
  reporting: string;
  filterButtonName: string;
  printButtonName: string;
  excelButtonName: string;
  addButtonName: string;
  tableHeaderUserQueueNumber: string;
  tableHeaderPsMobileNo: string;
  tableHeaderPsFirstName: string;
  tableHeaderPsLastName: string;
  tableHeaderPassingRoleDate: string;
  tableHeaderPassingCheckedInDate: string;
  add: string;
  edit: string;
  delete: string;
  close: string;
  confirmDeleteText: string;
  confirmDeleteTitle: string;
  fromDate: string;
  toDate: string;
}

export const Labels: Record<UserLanguage, IQueueList> = {
  fa: {
    chassis: "شماره شاسی",
    carType: "نوع خودرو",
    mobileNo: "موبایل",
    status: "وظعیت",
    serviceRoleDate: "زمان مراجعه",
    serviceCheckedInDate: " زمان کنترل",
    cancelDate: " زمان کنسلی",

    titleCardTitle: "لیست عبور",
    titleCardDescription: "در این بخش، می توانید لیست عبور را مدیریت کنید. ",
    contentCardTitle: "لیست ظرفیت",
    search: "جستجو",
    reporting: "گزارشگیری",
    filterButtonName: "فیلتر",
    printButtonName: "پرینت",
    excelButtonName: "اکسل",
    addButtonName: "جدید",
    tableHeaderUserQueueNumber: "شماره نوبت",
    tableHeaderPsMobileNo: "شماره همراه",
    tableHeaderPsFirstName: "نام",
    tableHeaderPsLastName: "نام خانوادگی",
    tableHeaderPassingRoleDate: "زمان مراجعه",
    tableHeaderPassingCheckedInDate: "زمان عبور",
    edit: "ویرایش  ",
    add: "افزودن  ",
    delete: "حذف",
    close: "بستن",
    confirmDeleteText: "از حذف   اطمینان دارید؟",
    confirmDeleteTitle: "حذف  ",
    fromDate: "از تاریخ",
    toDate: "تا تاریخ",
  },
  en: {
    chassis: "chassis",
    carType: "Car Type",
    mobileNo: "Mobile ",
    status: "Status",
    serviceRoleDate: "Service Role Date",
    serviceCheckedInDate: "Service Checked In Date",
    cancelDate: "Cancel Date",

    titleCardTitle: "Freight charge type",
    titleCardDescription:
      "In this section, you can manage the freight charge types. By clicking on any of the items, you can edit or delete it.",
    contentCardTitle: "capacity list",
    search: "search",
    reporting: "reporting",
    filterButtonName: "Filter",
    printButtonName: "Print",
    excelButtonName: "Excel",
    addButtonName: "New",
    tableHeaderUserQueueNumber: "tableHeaderUserQueueNumber",
    tableHeaderPsMobileNo: "tableHeaderPsMobileNo",
    tableHeaderPsFirstName: "tableHeaderPsFirstName",
    tableHeaderPsLastName: "tableHeaderPsLastName",
    tableHeaderPassingRoleDate: "tableHeaderPassingRoleDate",
    tableHeaderPassingCheckedInDate: "tableHeaderPassingCheckedInDate",
    edit: "edit",
    add: "add",
    confirmDeleteText: "Are you sure to delete?",
    confirmDeleteTitle: "Delete the charge",
    close: "close",
    delete: "delete",
    fromDate: "fromDate",
    toDate: "toDate",
  },
};
