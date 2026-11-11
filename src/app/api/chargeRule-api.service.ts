import { Injectable } from "@angular/core";
import { HttpRequestService } from "../services/http-request.service";
import { JsonParser } from "../utils/jsonparser";
import ChargeRuleDM, {
  ChargeRulePaymentDM,
  ChargeRulePaymentErrorDM,
  PaymentResultDM,
} from "../store/dataModels/ChargeRuleDM";

@Injectable({
  providedIn: "root",
})
export class ChargeRuleApiService {
  constructor(private httpRequest: HttpRequestService) {}

  public async AddChargeRule(
    passingCount: string,
    title: string,
    usableStartDate: string,
    usableFinishDate: string,
    chargeableStartDate: string,
    chargeableFinishDate: string,
    description: string,
  ) {
    const params = {
      Title: title,
      ChargeableStartDate: chargeableStartDate,
      ChargeableFinishDate: chargeableFinishDate,
      PassingCount: passingCount,
      Description: description,
      UsableStartDate: usableStartDate,
      UsableFinishDate: usableFinishDate,
    };
    return await this.httpRequest.POST("/BorderLander/AddChargeRule", params);
  }

  public async getPaymentResult(invoiceId: string) {
    const data: any = await this.httpRequest.GET(
      "/Payment/PaymentResult/" + invoiceId,
    );
    return JsonParser.deserializeObject(data.Payment, PaymentResultDM);
  }
}
