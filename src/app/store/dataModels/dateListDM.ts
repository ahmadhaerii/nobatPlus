import { JsonObject, JsonProperty } from "json2typescript";
import Datamodel from "./base/datamodel";

@JsonObject("DateListDM")
export default class DateListDM extends Datamodel {
  @JsonProperty("ServiceRoleDateID", String, true) override id = "";
  @JsonProperty("ServiceRoleDateID", String, true) serviceRoleDateId = "";
  @JsonProperty("ServiceRoleDate", String, true) serviceRoleDate: string = "";
  @JsonProperty("RemainingCapacity", String, true) remainingCapacity: string =
    "";
  @JsonProperty("HasCapacity", Boolean, true) hasCapacity: boolean = false;
  @JsonProperty("DayOfWeek", String, true) dayOfWeek: string = "";
}
