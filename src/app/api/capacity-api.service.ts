import { Injectable } from "@angular/core";
import { HttpRequestService } from "../services/http-request.service";
import { JsonParser } from "../utils/jsonparser";
import ServiceRoleDM from "../store/dataModels/serviceRoleDM";

@Injectable({
  providedIn: "root",
})
export class CapacityApiService {
  constructor(private httpRequest: HttpRequestService) {}

  public async CapacityList() {
    const data: any = await this.httpRequest.GET(
      "/ServiceRole/ServiceDateStatus",
    );
    return JsonParser.deserializeArray(data.Status, ServiceRoleDM);
  }

  public async AddRole(fromDate: string, toDate: string, hours: number[]) {
    const params = {
      FromDate: fromDate.replaceAll("-", ""),
      ToDate: toDate.replaceAll("-", ""),
      Hours: hours,
      ServiceType: "PR",
    };
    return await this.httpRequest.POST("/ServiceRole/AddRole", params);
  }
}
