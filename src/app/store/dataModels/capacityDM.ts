import { JsonObject, JsonProperty } from 'json2typescript';
import Datamodel from './base/datamodel';

@JsonObject('CapacityDM')
export default class CapacityDM extends Datamodel {
  @JsonProperty('PassingRoleDateID', String, true) override id = '';
  @JsonProperty('PassengerCount', Number, true) passengerCount = '';
  @JsonProperty('CapacityTitle', String, true) capacityTitle = '';
  @JsonProperty('DayOfWeek', String, true) dayOfWeek = '';
  @JsonProperty('PassingCheckedInCount', Number, true)
  passingCheckedInCount = 0;
  @JsonProperty('PassingRoleDate', String, true) passingRoleDate = '';
  @JsonProperty('PassingRoleDateID', String, true) passingRoleDateID = '';
  @JsonProperty('RemainingCapacity', Number, true)
  remainingCapacity = 0;
  @JsonProperty('TotalCapacity', Number, true) totalCapacity = '';
  @JsonProperty('UsedCapacity', Number, true) usedCapacity = '';
  @JsonProperty('VoidCount', Number, true) voidCount = '';
}
