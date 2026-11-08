import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LabelManagerService } from 'src/app/services/label-manager.service';
import {
  DashboardHeaderLabels,
  IDashboardHeaderLabel,
} from './dashboard-header.label';
import { HttpRequestService } from 'src/app/services/http-request.service';
import BorderDM from 'src/app/store/dataModels/borderDM';
import { BorderListApiService } from 'src/app/api/border-list-api.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
})
export class DashboardHeaderComponent {
  @Output() menuSelectEmit = new EventEmitter<string>();
  @Input() set isSelectedItemEmit(value: boolean) {
    this.isMenuOpen = value;
  }
  dashboardHeaderLabels: IDashboardHeaderLabel = {} as IDashboardHeaderLabel;
  borderList: BorderDM[] = [];
  currentBorder: BorderDM | undefined;
  isMenuOpen = true;

  get borderId() {
    return this.httpService.borderId;
  }

  constructor(
    private httpService: HttpRequestService,
    private labelManagerService: LabelManagerService,
    private borderListApi: BorderListApiService,
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.borderList = await this.borderListApi.doLoad(true);
    } catch (error) {
      console.log(error);
    }
    this.dashboardHeaderLabels =
      this.labelManagerService.getLabels<IDashboardHeaderLabel>(
        DashboardHeaderLabels
      );
    this.currentBorder = this.borderList.find(
      (border) => border.borderID === this.borderId
    );
  }

  onMenuSelect() {
    this.menuSelectEmit.emit();
    this.isMenuOpen = !this.isMenuOpen;
  }
}
