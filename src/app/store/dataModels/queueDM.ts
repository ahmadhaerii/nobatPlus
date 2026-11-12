import { JsonObject, JsonProperty } from "json2typescript";
import Datamodel from "./base/datamodel";
import { PassengerDM } from "./turnInquiryDM";

@JsonObject("QueueDM")
export default class QueueDM extends Datamodel {
  @JsonProperty("ServiceQueueID", Number, true) override id: number = 0;
  @JsonProperty("ServiceQueueID", Number, true) serviceQueueId: number = 0;
  @JsonProperty("Chassis", String, true) chassis: String = "";
  @JsonProperty("ServiceTitle", String, true) serviceTitle: String = "";
  @JsonProperty("CancelTime", String, true) cancelTime: String = "";
  @JsonProperty("ServiceCheckedInTime", String, true)
  serviceCheckedInTime: string = "";
  @JsonProperty("ServiceExpireDate", String) serviceExpireDate: String = "";
  @JsonProperty("ServiceExpireTime", String) serviceExpireTime: string = "";
  @JsonProperty("CancelDescription", String, true) cancelDescription: String =
    "";
  @JsonProperty("MobileNo", String, true) mobileNo: String = "";
  @JsonProperty("StatusTitle", String, true) statusTitle: String = "";
  @JsonProperty("ServiceRoleTime", String, true) serviceRoleTime: String = "";
  @JsonProperty("CancelDate", String, true) cancelDate: String = "";
  @JsonProperty("ServiceRoleDate", String, true) serviceRoleDate: String = "";
  @JsonProperty("UserQueueNumber", String, true) userQueueNumber: String = "";
  @JsonProperty("ServiceCheckedInDate", String, true)
  serviceCheckedInDate: String = "";
  @JsonProperty("CarType", String, true) carType: String = "";
  @JsonProperty("Status", String, true) status: String = "";
}
