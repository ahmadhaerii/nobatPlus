import { UserLanguage } from 'src/app/services/label-manager.service';

export interface IAddManualQueueTcDialogLabel {
  dialogTitle: string;
  dialogMessage: string;
  buttonLabelCancel: string;
  buttonLabelLogout: string;
  buttonLabelClose:string
}

export const AddManualQueueTcLabel: Record<UserLanguage, IAddManualQueueTcDialogLabel> = {
  fa: {
    dialogTitle: 'ثبت مجوز',
    dialogMessage: 'آیا از خروج اطمینان دارید؟',
    buttonLabelCancel: 'انصراف',
    buttonLabelLogout: 'خروج',
    buttonLabelClose:'بستن'
  },

  en: {
    dialogTitle: 'License registration',
    dialogMessage: 'Are you sure to logout?',
    buttonLabelCancel: 'Cancel',
    buttonLabelLogout: 'Logout',
    buttonLabelClose:'Close'
  },
};
