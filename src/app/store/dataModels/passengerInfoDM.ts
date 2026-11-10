import { JsonObject, JsonProperty } from 'json2typescript';
import Datamodel from './base/datamodel';
import { PassengerDM } from './turnInquiryDM';

@JsonObject('PassengerInfoDM')
export default class PassengerInfoDM extends Datamodel {
  @JsonProperty('PassingQueueID', Number, true) override id = '';
  @JsonProperty('BorderName_Fa', String, true) borderName_Fa = '';
  @JsonProperty('Cancelable', Boolean, true) cancelable = true;
  @JsonProperty('DayOfWeek', String, true) dayOfWeek = '';
  @JsonProperty('IssueDate', String, true) issueDate = '';
  @JsonProperty('IssueTime', String, true) issueTime = '';
  @JsonProperty('PassingCheckedInDate', String, true) passingCheckedInDate = '';
  @JsonProperty('PassingCheckedInTime', String, true) passingCheckedInTime = '';
  @JsonProperty('PassingExpireDate', String, true) passingExpireDate = '';
  @JsonProperty('PassingExpireTime', String, true) passingExpireTime = '';
  @JsonProperty('PassingQueueID', Number, true) passingQueueID = 0;
  @JsonProperty('PassingRoleDate', String, true) passingRoleDate = '';
  @JsonProperty('PassingRoleTime', String, true) passingRoleTime = '';
  @JsonProperty('PassengerCount', Number, true) passengerCount = 0;
  @JsonProperty('PsFatherName', String, true) psFatherName = '';
  @JsonProperty('PsFirstName', String, true) psFirstName = '';
  @JsonProperty('PsInfoID', String, true) psInfoID = '';
  @JsonProperty('PsLastName', String, true) psLastName = '';
  @JsonProperty('PsMobileNo', String, true) psMobileNo = '';
  @JsonProperty('Status', String, true) status = '';
  @JsonProperty('StatusTitle', String, true) statusTitle = '';
  @JsonProperty('UserFullName', String, true) userFullName = '';
  @JsonProperty('UserQueueNumber', String, true) userQueueNumber = '';
  @JsonProperty('Passengers', [PassengerDM], true) passengers: PassengerDM[] =
    [];
}

@JsonObject('PassengerInfoErrorDM')
export class PassengerInfoErrorDM extends Datamodel {
  @JsonProperty('ErrorText_Fa', String, true) errorText_Fa = '';
  @JsonProperty('ErrorText_En', String, true) errorText_En = '';
  @JsonProperty('ErrorCode', Number, true) errorCode = 0;
}
