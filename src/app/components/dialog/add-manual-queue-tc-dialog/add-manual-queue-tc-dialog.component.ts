import { Component, Input, OnInit } from "@angular/core";
import { NiraModalConfig } from "nira-modal";
import { Subject } from "rxjs";
import {
  AddManualQueueTcLabel,
  IAddManualQueueTcDialogLabel,
} from "./add-manual-queue-tc-dialog.label";
import { LabelManagerService } from "src/app/services/label-manager.service";
import { IManualQueueFormDialogLabel } from "../manual-queue-form-dialog/manual-queue-form-dialog.label";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import PassengerInfoDM from "src/app/store/dataModels/passengerInfoDM";
import { QueueApiService } from "src/app/api/queue-api.service";

@Component({
  selector: "app-add-manual-queue-tc-dialog",
  templateUrl: "./add-manual-queue-tc-dialog.component.html",
  styleUrls: ["./add-manual-queue-tc-dialog.component.scss"],
})
export class AddManualQueueTcDialogComponent implements OnInit {
  @Input() config!: NiraModalConfig;
  @Input() closeSubject!: Subject<any>;
  step: number = 1;
  passengerInfo: PassengerInfoDM = new PassengerInfoDM();

  labels: IAddManualQueueTcDialogLabel =
    this.labelManagerService.getLabels<IAddManualQueueTcDialogLabel>(
      AddManualQueueTcLabel,
    );
  myForm: FormGroup = {} as FormGroup;
  loading: boolean = false;

  constructor(
    private labelManagerService: LabelManagerService,
    private queueApiService: QueueApiService,
  ) {}
  ngOnInit(): void {
    this.myForm = new FormGroup({
      formControlNationalID: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]{10}$"),
      ]),
    });
  }

  async addManualQueue() {
    try {
      this.loading = true;
      const result = await this.queueApiService.AddManualQueueTC(
        this.myForm.get("formControlNationalID")?.value,
        this.config.data.passingRoleHourID,
      );

      if (result instanceof PassengerInfoDM) {
        this.passengerInfo = result;
        this.step = 2;
      }
      this.loading = false;
    } catch (error) {
      console.error;
      this.loading = false;
    }
  }

  close() {
    if (this.step === 2) {
      this.closeSubject.next("true");
    } else {
      this.closeSubject.next("");
    }
  }
}
