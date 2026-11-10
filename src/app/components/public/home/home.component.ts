import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ServiceTypeApiService } from "src/app/api/service-type-api.service";
import ServiceTypeDM from "src/app/store/dataModels/serviceTypeDM";

@Component({
  selector: "bp-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  services: ServiceTypeDM[] = [];

  constructor(
    private router: Router,
    private serviceTypeApi: ServiceTypeApiService,
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  async getList() {
    try {
      this.services = await this.serviceTypeApi.getServices();
    } catch (error) {}
  }

  open(route: string): void {
    this.router.navigate([route]);
  }
}
