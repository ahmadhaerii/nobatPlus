import { JsonObject, JsonProperty } from "json2typescript";
import Datamodel from "./base/datamodel";

@JsonObject("HelpDM")
export default class HelpDM extends Datamodel {
  @JsonProperty("FAQID", Number, true) override id = 0;
  @JsonProperty("FAQID", Number, true) faqId = 0;
  @JsonProperty("FAQTitle", String, true) title = "";
  @JsonProperty("FAQDescription", String, true) description = "";
}
