import { Component, EventEmitter, Input, Output, Type } from '@angular/core';
import { LabelManagerService } from 'src/app/services/label-manager.service';
import { Links, routeLinks } from 'src/app/utils/links';
import { ISlideMenuLabel, SlideMenuLabels } from './slide-menu.label';
import { NiraModalService } from 'nira-modal';
import { MessageLogoutDialogComponent } from '../../dialogs/message-logout-dialog/message-logout-dialog.component';
import { HomeIconComponent } from 'src/app/svg-icons/home-icon/home-icon.component';
import { SearchIconComponent } from 'src/app/svg-icons/search-icon/search-icon.component';
import { ScheduleIconComponent } from 'src/app/svg-icons/schedule-icon/schedule-icon.component';
import { ListAltIconComponent } from 'src/app/svg-icons/list-alt-icon/list-alt-icon.component';
import { Util } from 'src/app/utils/util';
import { PermissionsService } from 'src/app/services/permissions.service';
import { HttpRequestService } from 'src/app/services/http-request.service';

export interface Item {
  title: string;
  icon: Type<any> | null;
  link: routeLinks | null;
  type: string;
  child: any;
  access: string;
}
@Component({
  selector: 'app-slide-menu',
  templateUrl: './slide-menu.component.html',
  styleUrls: ['./slide-menu.component.scss'],
})
export class SlideMenuComponent {
  labels: ISlideMenuLabel =
    this.labelManagerService.getLabels<ISlideMenuLabel>(SlideMenuLabels);
  @Input() isMenuSelect = false;
  @Output() isSelectedItemEmit = new EventEmitter<boolean>();

  menuItemClicked!: Item;
  childItemClicked!: any;
  menuList: Item[] = [
    {
      title: this.labels.dashboardHome,
      icon: HomeIconComponent,
      link: this.links.dashboardHome.route,
      type: 'menu',
      access: '',
      child: [],
    },
    {
      title: this.labels.crossingList,
      icon: ListAltIconComponent,
      link: this.links.crossingList.route,
      type: 'menu',
      access: 'PQLCHECKIN',
      child: [],
    },
    {
      title: this.labels.capacityList,
      icon: ListAltIconComponent,
      link: this.links.capacityList.route,
      type: 'menu',
      access: '',
      child: [],
    },
    {
      title: this.labels.manualQueueList,
      icon: ListAltIconComponent,
      link: this.links.manualQueueList.route,
      type: 'menu',
      access: '',
      child: [],
    },
    {
      title: this.labels.lastAddedQueueList,
      icon: ListAltIconComponent,
      link: this.links.lastAddedQueueList.route,
      type: 'menu',
      access: 'LASTPQLIST',
      child: [],
    },
    {
      title: this.labels.adminTurnInquiry,
      icon: SearchIconComponent,
      link: this.links.adminTurnInquiry.route,
      type: 'menu',
      access: '',
      child: [],
      // "tst.borderpark.ir"
      // http://tst.borderpark.ir/api/PassingRole/DateList
    },
    {
      title: this.labels.registerCrossing,
      icon: ScheduleIconComponent,
      link: this.links.registerCrossing.route,
      type: 'menu',
      access: '',
      child: [],
    },
  ];

  get isRunningOnSmallScreen() {
    return Util.isRunningOnSmallScreen();
  }

  get links() {
    return Links;
  }

  get borderId() {
    return this.httpService.borderId;
  }

  constructor(
    private labelManagerService: LabelManagerService,
    private niraModalService: NiraModalService,
    private httpService: HttpRequestService,
    private permissions: PermissionsService
  ) {}

  checkAccess(subject: string) {
    return this.permissions.can(subject);
  }

  onItemClick() {
    if (this.isRunningOnSmallScreen) {
      this.isMenuSelect = true;
      this.isSelectedItemEmit.emit(this.isMenuSelect);
    }
  }

  onMenuItemClick(menuItem: Item) {
    if (this.menuItemClicked == menuItem) {
      this.menuItemClicked = {} as Item;
    } else {
      this.menuItemClicked = menuItem;
    }
  }

  onItemChildClick(child: any) {
    this.childItemClicked = child;
  }

  logOut() {
    this.niraModalService.open(MessageLogoutDialogComponent, {
      data: {},
    });
  }
}
