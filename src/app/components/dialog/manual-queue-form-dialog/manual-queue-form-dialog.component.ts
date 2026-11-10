import { Component, EventEmitter, Input, Output } from "@angular/core";
import { LabelManagerService } from "src/app/services/label-manager.service";
import { BehaviorSubject, Subject } from "rxjs";
import { NiraModalConfig } from "nira-modal";
import {
  IManualQueueFormDialogLabel,
  ManualQueueFormLabel,
} from "./manual-queue-form-dialog.label";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { QueueCS } from "src/app/store/componentStore/queueCS";
import PassengerInfoDM from "src/app/store/dataModels/passengerInfoDM";
import FamilyRelationshipDM from "src/app/store/dataModels/familyRelationshipDM";
import { DateApiService } from "src/app/api/date-api.service";

@Component({
  selector: "app-manual-queue-form-dialog",
  templateUrl: "./manual-queue-form-dialog.component.html",
  styleUrls: ["./manual-queue-form-dialog.component.scss"],
})
export class ManualQueueFormDialogComponent {
  @Input() config!: NiraModalConfig;
  @Input() closeSubject!: Subject<any>;
  labels: IManualQueueFormDialogLabel =
    this.labelManagerService.getLabels<IManualQueueFormDialogLabel>(
      ManualQueueFormLabel,
    );
  loading: boolean = false;
  step: number = 1;
  passengerInfo: PassengerInfoDM = new PassengerInfoDM();

  familyRelationshipList: BehaviorSubject<FamilyRelationshipDM[]> =
    new BehaviorSubject<FamilyRelationshipDM[]>([]);

  myForm = new FormGroup({
    formControlNationalID: new FormControl("", [
      Validators.required,
      Validators.pattern("^[0-9]{10}$"),
    ]),
    formControlName: new FormControl("", Validators.required),
    formControlLastName: new FormControl("", Validators.required),
    formControlFatherName: new FormControl("", Validators.required),
    formControlMobile: new FormControl("", [
      Validators.required,
      Validators.pattern("^09[0-9]{9}$"),
    ]),
    companions: new FormArray([]),
  });

  get companions(): FormArray {
    return this.myForm.get("companions") as FormArray;
  }

  constructor(
    private labelManagerService: LabelManagerService,
    private queueCS: QueueCS,
    private dateApiService: DateApiService,
  ) {}

  addCompanion(): void {
    const companionGroup = new FormGroup({
      FirstName: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
      LastName: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
      NationalID: new FormControl("", [
        Validators.required,
        Validators.pattern(/^\d{10}$/),
      ]),
      FamilyRelationship: new FormControl("", Validators.required),
    });

    this.companions.push(companionGroup);
  }

  async ngOnInit(): Promise<void> {
    try {
      this.familyRelationshipList.next(
        await this.dateApiService.FamilyRelationshipList(),
      );
    } catch (error) {
      console.error(error);
    }
  }

  removeCompanion(index: number): void {
    this.companions.removeAt(index);
  }

  async addManualQueue() {
    this.loading = true;
    try {
      this.passengerInfo = await this.queueCS.addManualQueue(
        this.myForm.get("formControlMobile")?.value!,
        this.config.data.passingRoleHourID,
        this.myForm.get("formControlName")?.value!,
        this.myForm.get("formControlLastName")?.value!,
        this.myForm.get("formControlFatherName")?.value!,
        this.myForm.get("formControlNationalID")?.value!,
        this.companions.value,
      );
      this.step = 2;
    } catch (error) {
      console.error(error);
    }
  }

  close() {
    this.closeSubject.next("true");
  }
}
