import { Component } from "@angular/core";
import { CapacityListLabels, ICapacityList } from "./capacity-list.label";
import { BehaviorSubject } from "rxjs";
import { LabelManagerService } from "src/app/services/label-manager.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import * as XLSX from "xlsx";
import { Router } from "@angular/router";
import { Links } from "src/app/utils/links";
import { ListAltIconComponent } from "src/app/svg-icons/list-alt-icon/list-alt-icon.component";
import { EditSquareIconComponent } from "src/app/svg-icons/edit-square-icon/edit-square-icon.component";
import { HttpRequestService } from "src/app/services/http-request.service";
import { TableKeys } from "src/app/utils/constants";
import { COLUMNS_TYPES } from "nira-falcon";
import { CapacityCS } from "src/app/store/componentStore/capacityCS";
import ServiceRoleDM, {
  ServiceRoleDateDM,
} from "src/app/store/dataModels/serviceRoleDM";

@Component({
  selector: "app-capacity-list",
  templateUrl: "./capacity-list.component.html",
  styleUrls: ["./capacity-list.component.scss"],
})
export class CapacityListComponent {
  tableKey = TableKeys.CAPACITY_LIST;

  labels: ICapacityList =
    this.labelManagerService.getLabels<ICapacityList>(CapacityListLabels);
  loading = false;
  form: FormGroup = new FormGroup({
    serviceTypeFormControl: new FormControl("", Validators.required),
  });
  tableData: BehaviorSubject<ServiceRoleDateDM[]> = new BehaviorSubject<
    ServiceRoleDateDM[]
  >([]);
  serviceRoles: BehaviorSubject<ServiceRoleDM[]> = new BehaviorSubject<
    ServiceRoleDM[]
  >([]);
  defaultServiceRole = new ServiceRoleDM();

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
    private capacityCS: CapacityCS,
    private router: Router,
  ) {}

  async ngOnInit() {
    setTimeout(async () => {
      await this.getList();
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

  async getList() {
    this.loading = true;
    try {
      const data = await this.capacityCS.doLoad();
      this.serviceRoles.next(data);
      if (data.length > 0) {
        this.defaultServiceRole = data[0];
        this.onServiceTypeSelect(this.defaultServiceRole.serviceTypeId);
      }
    } catch (error) {
      console.log(error);
    }
    this.loading = false;
  }

  registerCrossing() {
    this.router.navigate(["/dashboard/register-crossing"]);
  }
  onServiceTypeSelect(id: string) {
    const result = this.serviceRoles
      .getValue()
      .find((service: ServiceRoleDM) => service.serviceTypeId === id);
    if (result) this.tableData.next(result.roleDates);
  }
  exportExcel() {
    let element = document.getElementById("excel-table");

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, "SheetJS.xlsx");
  }
}
