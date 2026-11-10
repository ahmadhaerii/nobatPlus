import { UserLanguage } from 'src/app/services/label-manager.service';

export interface IDashboardHeaderLabel {
  headerTitle: string;
}

export const DashboardHeaderLabels: Record<
  UserLanguage,
  IDashboardHeaderLabel
> = {
  fa: {
    headerTitle: 'BorderPass',
  },
  en: {
    headerTitle: 'BorderPass',
  },
};
