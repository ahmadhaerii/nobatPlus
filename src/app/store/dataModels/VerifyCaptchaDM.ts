import { JsonObject, JsonProperty } from 'json2typescript';
import Datamodel from './base/datamodel';

@JsonObject('VerifyCaptchaDM')
export default class VerifyCaptchaDM extends Datamodel {
  @JsonProperty('Captcha', String, true) captcha = '';
  @JsonProperty('HiddenToken', String, true) hiddenToken = '';
}
