import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NiraModalService } from "nira-modal";
import { PermissionsService } from "src/app/services/permissions.service";
import { ManualQueueFormDialogComponent } from "../../dialog/manual-queue-form-dialog/manual-queue-form-dialog.component";
import { QueueListByHourDialogComponent } from "../../dialog/queue-list-by-hour-dialog/queue-list-by-hour-dialog.component";
import { AddManualQueueTcDialogComponent } from "../../dialog/add-manual-queue-tc-dialog/add-manual-queue-tc-dialog.component";

@Component({
  selector: "core-hour-number",
  templateUrl: "./core-hour-number.component.html",
  styleUrls: ["./core-hour-number.component.scss"],
})
export class CoreHourNumberComponent {
  @Input() capacity: number = 0;
  @Input() useCapacity: number = 0;
  @Input() remainingCapacity: number = 0;
  @Input() passingRoleHourID: string = "";
  @Input() label: string = "";
  @Input() editMode: boolean = true;
  @Output() changeCapacityEmit = new EventEmitter<any>();
  @Output() refresh = new EventEmitter<string>();

  constructor(
    private niraModalService: NiraModalService,
    private permissions: PermissionsService,
  ) {}

  checkAccess(subject: string) {
    return this.permissions.can(subject);
  }

  onCapacityChange() {
    this.changeCapacityEmit.emit({
      capacity: this.capacity,
      hour: this.label,
    });
  }

  openManualQueueForm() {
    const modal = this.niraModalService.open(ManualQueueFormDialogComponent, {
      data: {
        passingRoleHourID: this.passingRoleHourID,
      },
    });
    modal.afterClosed.subscribe((result) => {
      if (result === "true") this.refresh.emit();
    });
  }

  openManualQueueTcDialog() {
    const modal = this.niraModalService.open(AddManualQueueTcDialogComponent, {
      data: {
        passingRoleHourID: this.passingRoleHourID,
      },
    });
    modal.afterClosed.subscribe((result) => {
      if (result === "true") this.refresh.emit();
    });
  }

  openQueueListByHour() {
    this.niraModalService.open(QueueListByHourDialogComponent, {
      data: {
        passingRoleHourID: this.passingRoleHourID,
      },
    });
  }
}
