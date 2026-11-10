import { UserLanguage } from 'src/app/services/label-manager.service';

export interface ISlideMenuLabel {
  dashboard: string;
  basicInformation: string;
  dashboardHome: string;
  capacityList: string;
  crossingList: string;
  registerCrossing: string;
  adminTurnInquiry: string;
  manualQueueList: string;
  lastAddedQueueList: string;
  exit: string;
}
export const SlideMenuLabels: Record<UserLanguage, ISlideMenuLabel> = {
  fa: {
    dashboard: 'داشبورد',
    basicInformation: 'اطلاعات پایه',
    dashboardHome: 'خانه',
    capacityList: 'لیست ظرفیت',
    crossingList: 'لیست عبور',
    registerCrossing: 'مدیریت ظرفیت',
    adminTurnInquiry: 'استعلام نوبت',
    manualQueueList: 'نوبت های دستی',
    lastAddedQueueList: 'نوبت های اخیر',
    exit: 'خروج',
  },
  en: {
    dashboard: 'Dashboard',
    basicInformation: 'Basic Information',
    dashboardHome: 'dashboard home',
    capacityList: 'capacity list  ',
    crossingList: 'crossing list  ',
    registerCrossing: 'register crossing ',
    adminTurnInquiry: 'turn inquiry',
    manualQueueList: 'manual queue',
    lastAddedQueueList: 'last added queue',
    exit: 'exit',
  },
};
