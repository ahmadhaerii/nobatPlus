import { JsonObject, JsonProperty } from "json2typescript";
import Datamodel from "./base/datamodel";

@JsonObject("ServiceRoleDateDM")
export class ServiceRoleDateDM extends Datamodel {
  @JsonProperty("ServiceRoleDateID", String, true) override id = "";
  @JsonProperty("ServiceRoleDateID", String, true) serviceRoleDateId = "";
  @JsonProperty("TotalCapacity", Number, true) totalCapacity = 0;
  @JsonProperty("UsedCapacity", Number, true) usedCapacity = 0;
  @JsonProperty("ServiceRoleDate", String, true) serviceRoleDate = "";
  @JsonProperty("RemainingCapacity", Number, true) remainingCapacity = 0;
  @JsonProperty("DayOfWeek", String, true) dayOfWeek = "";
  @JsonProperty("CapacityTitle", String, true) capacityTitle = "";
}
@JsonObject("ServiceRoleDM")
export default class ServiceRoleDM extends Datamodel {
  @JsonProperty("ServiceTypeID", String, true) override id = "";
  @JsonProperty("ServiceTypeID", String, true) serviceTypeId = "";
  @JsonProperty("ServiceTitle", String, true) serviceTitle: string = "";
  @JsonProperty("RoleDates", [ServiceRoleDateDM], true)
  roleDates: ServiceRoleDateDM[] = [];
}
