import { JsonObject, JsonProperty } from 'json2typescript';
import Datamodel from './base/datamodel';

@JsonObject('FamilyRelationshipDM')
export default class FamilyRelationshipDM extends Datamodel {
  @JsonProperty('FamilyRelationshipIDFamilyRelationshipTitle', String, true) override id = '';
  @JsonProperty('FamilyRelationshipID', String, true) familyRelationshipID = '';
  @JsonProperty('FamilyRelationshipTitle', String, true) familyRelationshipTitle = '';
}
