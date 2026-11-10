import { Component, EventEmitter, Input, Output } from "@angular/core";
import { LabelManagerService } from "src/app/services/label-manager.service";
import {
  DashboardHeaderLabels,
  IDashboardHeaderLabel,
} from "./dashboard-header.label";
import { HttpRequestService } from "src/app/services/http-request.service";

@Component({
  selector: "app-dashboard-header",
  templateUrl: "./dashboard-header.component.html",
  styleUrls: ["./dashboard-header.component.scss"],
})
export class DashboardHeaderComponent {
  @Output() menuSelectEmit = new EventEmitter<string>();
  @Input() set isSelectedItemEmit(value: boolean) {
    this.isMenuOpen = value;
  }
  dashboardHeaderLabels: IDashboardHeaderLabel = {} as IDashboardHeaderLabel;

  isMenuOpen = true;

  constructor(
    private httpService: HttpRequestService,
    private labelManagerService: LabelManagerService,
  ) {}

  async ngOnInit(): Promise<void> {}

  onMenuSelect() {
    this.menuSelectEmit.emit();
    this.isMenuOpen = !this.isMenuOpen;
  }
}
