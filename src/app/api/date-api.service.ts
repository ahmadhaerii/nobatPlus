import { Injectable } from "@angular/core";
import { HttpRequestService } from "../services/http-request.service";
import { JsonParser } from "../utils/jsonparser";
import DateDM from "../store/dataModels/dateDM";
import VerifyCaptchaDM from "../store/dataModels/VerifyCaptchaDM";
import FamilyRelationshipDM from "../store/dataModels/familyRelationshipDM";
import PassengerInfoDM from "../store/dataModels/passengerInfoDM";

@Injectable({
  providedIn: "root",
})
export class DateApiService {
  constructor(private httpRequest: HttpRequestService) {}

  public async Generate() {
    const data: any = await this.httpRequest.GET("/" + "api/Captcha/Generate");
    return JsonParser.deserializeObject(data.Captcha, VerifyCaptchaDM);
  }

  public async DateList() {
    const data: any = await this.httpRequest.GET(
      "/" + "api/PassingRole/DateList",
    );
    return JsonParser.deserializeArray(data.Dates, DateDM);
  }

  public async DateListTamarchin() {
    const data: any = await this.httpRequest.GET(
      "/" + "api/PassingRole/DateListBL",
    );
    return JsonParser.deserializeArray(data.Dates, DateDM);
  }

  public async DateDetails(passingRoleDateID: String) {
    const data: any = await this.httpRequest.GET(
      "/" + "api/PassingRole/DateDetailsII/" + passingRoleDateID,
    );
    return JsonParser.deserializeArray(data.DateDetails, DateDM);
  }

  public async DateDetailsTamarchin(passingRoleDateID: String) {
    const data: any = await this.httpRequest.GET(
      "/" + "api/PassingRole/DateDetailsIIBL/" + passingRoleDateID,
    );
    return JsonParser.deserializeArray(data.DateDetails, DateDM);
  }

  public async FamilyRelationshipList() {
    const data: any = await this.httpRequest.GET(
      "/" + "api/Passenger/FamilyRelationshipList",
    );
    return JsonParser.deserializeArray(
      data.FamilyRelationship,
      FamilyRelationshipDM,
    );
  }

  public async AddPsQueue(
    passingRoleHourID: string,
    psMobileNo: string,
    nationalID: string,
    captchaCode: string,
    hiddenToken: string,
  ) {
    const params = {
      PassingRoleHourID: passingRoleHourID,
      PsMobileNo: psMobileNo,
      PsInfoID: nationalID,
      Captcha: captchaCode,
      HiddenToken: hiddenToken,
    };
    const data: any = await this.httpRequest.POST(
      "/" + "api/PassingQueue/AddPsQueueByPsInfo",
      params,
    );
    return data.PassingQueue?.PassingQueueID;
  }

  public async AddPsQueueTamarchin(passingRoleHourID: string) {
    const params = {
      PassingRoleHourID: passingRoleHourID,
    };
    const data: any = await this.httpRequest.POST(
      "/" + "api/PassingQueue/AddByBorderLander",
      params,
    );
    return data;
  }

  public async addPsQueueNoCaptcha(
    passingRoleHourID: string,
    nationalID: string,
  ) {
    const params = {
      PassingRoleHourID: passingRoleHourID,
      PsInfoID: nationalID,
    };
    const data: any = await this.httpRequest.POST(
      "/" + "api/PassingQueue/AddPsQueueByPsInfo",
      params,
    );
    return data.PassingQueue?.PassingQueueID;
  }

  public async ConfirmMobileNo(confirmCode: number, passingQueueID: number) {
    const params = {
      ConfirmCode: confirmCode,
      PassingQueueID: passingQueueID,
    };
    return await this.httpRequest.POST(
      "/" + "api/PassingQueue/ConfirmMobileNo",
      params,
    );
  }

  public async SetPsInfo(
    passingQueueID: number,
    psInfoID: string,
    psFatherName: string,
    psLastName: string,
    psFirstName: string,
    passengers: any,
  ) {
    const params = {
      PassingQueueID: passingQueueID,
      PsInfoID: psInfoID,
      PsFatherName: psFatherName,
      PsLastName: psLastName,
      PsFirstName: psFirstName,
      Passengers: passengers,
    };
    const data: any = await this.httpRequest.POST(
      "/" + "api/PassingQueue/SetPsInfo",
      params,
    );
    return JsonParser.deserializeObject(data.PassingQueue, PassengerInfoDM);
  }

  public async InfoByPsInfoID(nationalID: string) {
    const data: any = await this.httpRequest.GET(
      "/" + "api/PassingQueue/InfoByPsInfoID/" + nationalID,
    );
    return JsonParser.deserializeObject(data.PassingQueue, PassengerInfoDM);
  }

  public async PQueueCancel(passingQueueID: number) {
    const params = {
      PassingQueueID: passingQueueID,
    };
    const data: any = await this.httpRequest.POST(
      "/" + "api/PassingQueue/PQueueCancel",
      params,
    );
    return data.PassingQueue?.PassingQueueID;
  }

  public async SetConfirmCancel(confirmCode: number, passingQueueID: number) {
    const params = {
      ConfirmCode: confirmCode,
      PassingQueueID: passingQueueID,
    };
    const data: any = await this.httpRequest.POST(
      "/" + "api/PassingQueue/SetConfirmCancel",
      params,
    );
    return data.PassingQueue?.PassingQueueID;
  }

  public async CheckExchange(psInfoID: string, passingRoleHourID: string) {
    const params = {
      PsInfoID: psInfoID,
      PassingRoleHourID: passingRoleHourID,
    };
    const data: any = await this.httpRequest.POST(
      "/" + "api/PassingQueue/CheckExchange",
      params,
    );
    return JsonParser.deserializeObject(data.PassingQueue, PassengerInfoDM);
  }

  public async Exchange(
    confirmCode: number,
    passingQueueID: number,
    passingRoleHourID: string,
  ) {
    const params = {
      ConfirmCode: confirmCode,
      PassingQueueID: passingQueueID,
      PassingRoleHourID: passingRoleHourID,
    };
    const data: any = await this.httpRequest.POST(
      "/" + "api/PassingQueue/Exchange",
      params,
    );
    return JsonParser.deserializeObject(data.PassingQueue, PassengerInfoDM);
  }
}
