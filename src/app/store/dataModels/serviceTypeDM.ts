import { JsonObject, JsonProperty } from "json2typescript";
import Datamodel from "./base/datamodel";

@JsonObject("ServiceTypeDM")
export default class ServiceTypeDM extends Datamodel {
  @JsonProperty("ServiceTypeID", String, true) override id = "";
  @JsonProperty("ServiceTypeID", String, true) serviceTypeId = "";
  @JsonProperty("ServiceTitle", String, true) serviceTitle: string = "";
}
