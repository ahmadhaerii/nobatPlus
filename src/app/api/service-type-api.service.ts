import { Injectable } from "@angular/core";
import { HttpRequestService } from "../services/http-request.service";
import { JsonParser } from "../utils/jsonparser";
import ServiceTypeDM from "../store/dataModels/serviceTypeDM";

@Injectable({ providedIn: "root" })
export class ServiceTypeApiService {
  constructor(private httpRequest: HttpRequestService) {}

  async getServices(): Promise<ServiceTypeDM[]> {
    const data: any = await this.httpRequest.GET(`/ServiceType/List`);
    return JsonParser.deserializeArray(data.ServiceTypes, ServiceTypeDM);
  }
}
