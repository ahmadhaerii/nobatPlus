import { UserLanguage } from 'src/app/services/label-manager.service';

export interface IManualQueueFormDialogLabel {
  dialogTitle: string;
  dialogMessage: string;
  buttonLabelCancel: string;
  buttonLabelLogout: string;
}

export const ManualQueueFormLabel: Record<UserLanguage, IManualQueueFormDialogLabel> = {
  fa: {
    dialogTitle: 'ثبت مجوز',
    dialogMessage: 'آیا از خروج اطمینان دارید؟',
    buttonLabelCancel: 'انصراف',
    buttonLabelLogout: 'خروج',
  },

  en: {
    dialogTitle: 'License registration',
    dialogMessage: 'Are you sure to logout?',
    buttonLabelCancel: 'Cancel',
    buttonLabelLogout: 'Logout',
  },
};
