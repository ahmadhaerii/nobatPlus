import { JsonObject, JsonProperty } from "json2typescript";
import Datamodel from "./base/datamodel";
import { PassengerDM } from "./turnInquiryDM";

@JsonObject("QueueDM")
export default class QueueDM extends Datamodel {
  @JsonProperty("UserQueueNumber", String, true) override id: String = "";
  @JsonProperty("CancelDate", String, true) cancelDate: String = "";
  @JsonProperty("CancelDescription", String, true) cancelDescription: String =
    "";
  @JsonProperty("CancelTime", String, true) cancelTime: String = "";
  @JsonProperty("UserQueueNumber", String, true) userQueueNumber: String = "";
  @JsonProperty("PassengerCount", Number) passengerCount: number = 0;
  @JsonProperty("Passengers", [PassengerDM], true) passengers: PassengerDM[] =
    [];
  @JsonProperty("PsInfoID", String, true) psInfoID: String = "";
  @JsonProperty("PsMobileNo", String, true) psMobileNo: String = "";
  @JsonProperty("PsFirstName", String, true) psFirstName: String = "";
  @JsonProperty("PsLastName", String, true) psLastName: String = "";
  @JsonProperty("PassingExpireDate", String, true) passingExpireDate: String =
    "";
  @JsonProperty("PassingExpireTime", String, true) passingExpireTime: String =
    "";
  @JsonProperty("PassingRoleDate", String, true) passingRoleDate: String = "";
  @JsonProperty("PassingRoleTime", String, true) passingRoleTime: String = "";
  @JsonProperty("PassingCheckedInDate", String, true)
  passingCheckedInDate: String = "";
  @JsonProperty("PassingCheckedInTime", String, true)
  passingCheckedInTime: String = "";
  @JsonProperty("StatusTitle", String, true) statusTitle: String = "";
}
