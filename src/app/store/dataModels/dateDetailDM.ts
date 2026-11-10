import { JsonObject, JsonProperty } from "json2typescript";
import Datamodel from "./base/datamodel";

@JsonObject("DateDetailDM")
export default class DateDetailDM extends Datamodel {
  @JsonProperty("ServiceRoleHourID", String, true) override id = "";
  @JsonProperty("ServiceRoleHourID", String, true) serviceRoleHourId = "";
  @JsonProperty("Title", String, true) title: string = "";
  @JsonProperty("Hour", String, true) hour: string = "";
  @JsonProperty("RemainingCapacity", String, true) available: string = "";
  @JsonProperty("DayOfWeek", String, true) dayOfWeek: string = "";
}
