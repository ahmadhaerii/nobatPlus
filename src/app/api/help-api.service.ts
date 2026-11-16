import { Injectable } from "@angular/core";
import { HttpRequestService } from "../services/http-request.service";
import { JsonParser } from "../utils/jsonparser";
import HelpDM from "../store/dataModels/helpDM";

@Injectable({
  providedIn: "root",
})
export class HelpApiService {
  constructor(private httpRequest: HttpRequestService) {}

  public async getList() {
    const data: any = await this.httpRequest.GET("/FAQ/Help");
    return JsonParser.deserializeArray(data.FAQs, HelpDM);
  }
}
