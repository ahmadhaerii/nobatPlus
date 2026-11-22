import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { QueueApiService } from "src/app/api/queue-api.service";
import MyServiceDM from "src/app/store/dataModels/myServiceDM";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "bp-my-services",
  templateUrl: "./my-services.component.html",
  styleUrls: ["./my-services.component.scss"],
})
export class MyServicesComponent implements OnInit {
  list: MyServiceDM[] = [];
  loading = false;

  constructor(
    private router: Router,
    private queueApi: QueueApiService,
    private auth: AuthService,
  ) {}

  ngOnInit(): void {
    if (!this.auth.isLoggedIn) {
      this.router.navigate(["/"]);
      this.auth.openLogin();
      return;
    }
    this.load();
  }

  async load(): Promise<void> {
    this.loading = true;
    try {
      this.list = await this.queueApi.QueueListByProfile();
    } catch (error) {
      this.list = [];
    } finally {
      this.loading = false;
    }
  }

  visitTime(item: MyServiceDM): string {
    const date = (item.serviceRoleDate || "").replace(/-/g, "/");
    return [item.serviceRoleTime, date].filter(Boolean).join(" - ");
  }

  isCanceled(item: MyServiceDM): boolean {
    return item.status === "V" || item.status === "X";
  }

  back(): void {
    this.router.navigate(["/"]);
  }

  trackById(_: number, item: MyServiceDM) {
    return item.id;
  }
}
