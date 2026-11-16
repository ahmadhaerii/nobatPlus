import { Component } from "@angular/core";
import { Labels, IQueueList } from "./queue-list.label";
import { BehaviorSubject } from "rxjs";
import { LabelManagerService } from "src/app/services/label-manager.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import * as XLSX from "xlsx";
import { Router } from "@angular/router";
import { Links } from "src/app/utils/links";
import { TableKeys } from "src/app/utils/constants";
import { COLUMNS_TYPES } from "nira-falcon";
import { CapacityCS } from "src/app/store/componentStore/capacityCS";
import ServiceRoleDM from "src/app/store/dataModels/serviceRoleDM";
import { QueueApiService } from "src/app/api/queue-api.service";
import QueueDM from "src/app/store/dataModels/queueDM";

@Component({
  selector: "app-queue-list",
  templateUrl: "./queue-list.component.html",
  styleUrls: ["./queue-list.component.scss"],
})
export class QueueListComponent {
  tableKey = TableKeys.CAPACITY_LIST;
  labels: IQueueList = this.labelManagerService.getLabels<IQueueList>(Labels);

  form: FormGroup = new FormGroup({
    serviceTypeFormControl: new FormControl("", Validators.required),
    formControlDate: new FormControl("", Validators.required),
  });
  tableData: BehaviorSubject<QueueDM[]> = new BehaviorSubject<QueueDM[]>([]);
  serviceRoles: BehaviorSubject<ServiceRoleDM[]> = new BehaviorSubject<
    ServiceRoleDM[]
  >([]);
  defaultServiceRole = new ServiceRoleDM();
  loading = false;
  serviceTypeId = "";

  columnsSchema = [
    {
      key: "chassis",
      type: COLUMNS_TYPES.TEXT,
      label: this.labels.chassis,
    },
    {
      key: "carType",
      type: COLUMNS_TYPES.TEXT,
      label: this.labels.carType,
    },
    {
      key: "mobileNo",
      type: COLUMNS_TYPES.TEXT,
      label: this.labels.mobileNo,
    },
    {
      key: "statusTitle",
      type: COLUMNS_TYPES.TEXT,
      label: this.labels.status,
    },
    {
      key: "serviceRoleDateTime",
      type: COLUMNS_TYPES.TEXT,
      label: this.labels.serviceRoleDate,
    },
    {
      key: "serviceCheckedInDateTime",
      type: COLUMNS_TYPES.TEXT,
      label: this.labels.serviceCheckedInDate,
    },
    {
      key: "serviceExpireDateTime",
      type: COLUMNS_TYPES.TEXT,
      label: this.labels.cancelDate,
    },
  ];

  get links() {
    return Links;
  }

  constructor(
    private labelManagerService: LabelManagerService,
    private queueApiService: QueueApiService,
    private capacityCS: CapacityCS,
    private router: Router,
  ) {}

  async ngOnInit() {
    setTimeout(async () => {
      await this.getCapacityList();
    }, 500);
  }

  onColumnClicked(data: { data: any; key: string }) {
    if (data.key === "manage") {
      this.router.navigate([
        Links.capacityManagement.route + "/" + data.data.passingRoleDateID,
      ]);
    } else if (data.key === "list") {
      this.router.navigate([
        Links.queueListByDate.route + "/" + data.data.passingRoleDateID,
      ]);
    }
  }

  async submit() {
    this.loading = true;
    try {
      const result = await this.queueApiService.QueueListByDate(
        this.form.controls["formControlDate"].value,
        this.serviceTypeId,
      );
      this.tableData.next(result);
    } catch (error) {}
    this.loading = false;
  }
  async getCapacityList() {
    this.loading = true;
    try {
      this.serviceRoles.next(await this.capacityCS.doLoad(true));
    } catch (error) {
      console.log(error);
    }
    this.loading = false;
  }

  onServiceTypeSelect(id: string) {
    this.serviceTypeId = id;
  }
  exportExcel() {
    let element = document.getElementById("excel-table");

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, "SheetJS.xlsx");
  }
}
