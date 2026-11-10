import { JsonObject, JsonProperty } from 'json2typescript';
import Datamodel from './base/datamodel';

@JsonObject('PassengerDM')
export class PassengerDM extends Datamodel {
  @JsonProperty('NationalID', String, true) override id = '';
  @JsonProperty('FirstName', String, true) firstName = '';
  @JsonProperty('LastName', String, true) lastName = '';
  @JsonProperty('NationalID', String, true) nationalID = '';
  @JsonProperty('FamilyRelationshipTitle', String, true) familyRelationshipTitle = '';

}
@JsonObject('TurnInquiryDM')
export default class TurnInquiryDM extends Datamodel {
  @JsonProperty('PassingQueueID', Number, true) override id: number = 0;
  @JsonProperty('BorderName_Fa', String, true) borderName_Fa = '';
  @JsonProperty('Cancelable', Boolean, true) cancelable = false;
  @JsonProperty('CancelDate', String, true) cancelDate = '';
  @JsonProperty('CancelTime', String, true) cancelTime = '';
  @JsonProperty('CancelDescription', String, true) cancelDescription = '';
  @JsonProperty('DayOfWeek', String, true) dayOfWeek = '';
  @JsonProperty('PassingCheckedInDate', String, true)
  passingCheckedInDate: string = '';
  @JsonProperty('PassingCheckedInTime', String, true)
  passingCheckedInTime: string = '';
  @JsonProperty('PassingExpireDate', String, true) passingExpireDate: string =
    '';
  @JsonProperty('PassingExpireTime', String, true) passingExpireTime: string =
    '';
  @JsonProperty('PassingQueueID', Number, true) passingQueueID: number = 0;
  @JsonProperty('PassingRoleDate', String, true) passingRoleDate: string = '';
  @JsonProperty('PassingRoleTime', String, true) passingRoleTime: string = '';
  @JsonProperty('PsFirstName', String, true) psFirstName: string = '';
  @JsonProperty('PsInfoID', String, true) psInfoID: string = '';
  @JsonProperty('PsLastName', String, true) psLastName: string = '';
  @JsonProperty('PsMobileNo', String, true) psMobileNo: string = '';
  @JsonProperty('Printable', Boolean, true) printable = false;
  @JsonProperty('Status', String, true) status: string = '';
  @JsonProperty('StatusTitle', String, true) statusTitle: string = '';
  @JsonProperty('UserQueueNumber', String, true) userQueueNumber: string = '';
  @JsonProperty('VoidDate', String, true) voidDate: string = '';
  @JsonProperty('VoidTime', String, true) voidTime: string = '';
  @JsonProperty('Passengers', [PassengerDM], true) passengers: PassengerDM[] = [];
}
