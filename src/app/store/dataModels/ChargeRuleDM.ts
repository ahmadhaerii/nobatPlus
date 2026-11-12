import { JsonObject, JsonProperty } from "json2typescript";
import Datamodel from "./base/datamodel";
type Captcha = "RECAPTCHA" | "CLOUDFLARE" | "SIMPLE";

@JsonObject("ChargeRuleDM")
export default class ChargeRuleDM extends Datamodel {
  @JsonProperty("BorderLanderChargeRuleID", Number, true)
  borderLanderChargeRuleID = 0;
  @JsonProperty("Title", String, true) title = "";
  @JsonProperty("PassingCount", Number, true) passingCount = 0;
  @JsonProperty("UsableStartDate", String, true) usableStartDate = "";
  @JsonProperty("UsableFinishDate", String, true) usableFinishDate = "";
  @JsonProperty("Description", String, true) description = "";
  @JsonProperty("Used", Boolean, true) used = false;
  loadingPayment: boolean = false;
}

@JsonObject("ChargeRulePaymentDM")
export class ChargeRulePaymentDM extends Datamodel {
  @JsonProperty("RedirectUrl", String, true) redirectUrl = "";
  @JsonProperty("Token", String, true) token = "";
}

@JsonObject("ChargeRulePaymentErrorDM")
export class ChargeRulePaymentErrorDM extends Datamodel {
  @JsonProperty("ErrorText_Fa", String, true) errorText_Fa = "";
  @JsonProperty("ErrorText_En", String, true) errorText_En = "";
  @JsonProperty("ErrorCode", Number, true) errorCode = 0;
}

@JsonObject("PaymentResultItemDM")
export class PaymentResultItemDM extends Datamodel {
  @JsonProperty("ServiceTypeID", String, true) serviceTypeId = "";
  @JsonProperty("ServiceTitle", String, true) serviceTitle = "";
  @JsonProperty("Value", String, true) value = "";
}
@JsonObject("PaymentResultDM")
export class PaymentResultDM extends Datamodel {
  @JsonProperty("PGReference", String, true) pgReference = "";
  @JsonProperty("UserQueueNumber", String, true) userQueueNumber = "";
  @JsonProperty("ServiceRoleDateTime", String, true) serviceRoleDateTime = "";
  @JsonProperty("MobileNo", String, true) mobileNo = "";
  @JsonProperty("Amount", Number, true) amount = 0;
  @JsonProperty("Items", [PaymentResultItemDM], true)
  items: PaymentResultItemDM[] = [];
}
