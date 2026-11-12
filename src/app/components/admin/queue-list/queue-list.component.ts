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
      key: "dayOfWeek",
      type: COLUMNS_TYPES.TEXT,
      label: this.labels.tableHeaderDayOfWeek,
    },
    {
      key: "serviceRoleDate",
      type: COLUMNS_TYPES.TEXT,
      label: this.labels.tableHeaderDate,
    },
    {
      key: "totalCapacity",
      type: COLUMNS_TYPES.TEXT,
      label: this.labels.tableHeaderTotalCapacity,
    },
    {
      key: "usedCapacity",
      type: COLUMNS_TYPES.TEXT,
      label: this.labels.tableHeaderTurnReceived,
    },
    {
      key: "remainingCapacity",
      type: COLUMNS_TYPES.NUMBER,
      label: this.labels.tableHeaderRemainingCapacity,
    },

    // {
    //   key: "action",
    //   type: COLUMNS_TYPES.ACTION_BUTTONS,
    //   label: "",
    //   data: [
    //     {
    //       key: "list",
    //       component: ListAltIconComponent,
    //     },
    //     {
    //       key: "manage",
    //       component: EditSquareIconComponent,
    //     },
    //   ],
    // },
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
    console.log("submit");
    console.log(this.serviceTypeId);
    console.log(this.form.controls["formControlDate"].value);
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
