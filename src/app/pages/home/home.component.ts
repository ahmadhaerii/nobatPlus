import { Component, inject } from "@angular/core";
import { NgFor } from "@angular/common";
import { Router } from "@angular/router";
import { ServiceTypeService } from "src/app/core/serviceType.service";
import ServiceTypeDM from "src/app/store/dataModels/serviceTypeDM";

@Component({
  selector: "bp-home",
  standalone: true,
  imports: [NgFor],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  private router = inject(Router);

  constructor(private serviceType: ServiceTypeService) {}
  services: ServiceTypeDM[] = [];

  ngOnInit(): void {
    this.getList();
  }

  async getList() {
    try {
      this.services = await this.serviceType.getServices();
    } catch (error) {}
  }
  open(route: string): void {
    this.router.navigate([route]);
  }
}
