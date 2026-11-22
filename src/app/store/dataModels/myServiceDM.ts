import { JsonObject, JsonProperty } from "json2typescript";
import Datamodel from "./base/datamodel";

@JsonObject("MyServiceItemDM")
export class MyServiceItemDM extends Datamodel {
  @JsonProperty("Title", String, true) title: string = "";
  @JsonProperty("Value", String, true) value: string = "";
}

@JsonObject("MyServiceDM")
export default class MyServiceDM extends Datamodel {
  @JsonProperty("ServiceQueueID", Number, true) override id = 0;
  @JsonProperty("ServiceTitle", String, true) serviceTitle: string = "";
  @JsonProperty("UserQueueNumber", String, true) userQueueNumber: string = "";
  @JsonProperty("ServiceRoleDate", String, true) serviceRoleDate: string = "";
  @JsonProperty("ServiceRoleTime", String, true) serviceRoleTime: string = "";
  @JsonProperty("Status", String, true) status: string = "";
  @JsonProperty("StatusTitle", String, true) statusTitle: string = "";
  @JsonProperty("Items", [MyServiceItemDM], true)
  items: MyServiceItemDM[] = [];
}
