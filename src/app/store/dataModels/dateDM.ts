import { JsonObject, JsonProperty } from 'json2typescript';
import Datamodel from './base/datamodel';

@JsonObject('DateDM')
export default class DateDM extends Datamodel {
  @JsonProperty('PassingRoleDateID', String, true) override id = '';
  @JsonProperty('CapacityTitle', String, true) capacityTitle = '';
  @JsonProperty('DayOfWeek', String, true) dayOfWeek = '';
  @JsonProperty('HasCapacity', Boolean, true) hasCapacity = false;
  @JsonProperty('Hour', String, true) hour = '';
  @JsonProperty('PassingRoleDate', String, true) passingRoleDate = '';
  @JsonProperty('PassingRoleDateID', String, true) passingRoleDateID = '';
  @JsonProperty('PassingRoleHourID', String, true) passingRoleHourID = '';
  @JsonProperty('RemainingCapacity', String, true) remainingCapacity = '';
  @JsonProperty('Title', String, true) title = '';
}
