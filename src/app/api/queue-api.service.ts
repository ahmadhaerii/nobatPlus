import { Injectable } from "@angular/core";
import { HttpRequestService } from "../services/http-request.service";
import { JsonParser } from "../utils/jsonparser";
import QueueDM from "../store/dataModels/queueDM";
import PassengerInfoDM, {
  PassengerInfoErrorDM,
} from "../store/dataModels/passengerInfoDM";

@Injectable({
  providedIn: "root",
})
export class QueueApiService {
  constructor(private httpRequest: HttpRequestService) {}

  public async QueueListByDate(passingRoleDateID: string, status: string) {
    const data: any = await this.httpRequest.GET(
      "/PassingQueue/QueueListByDate/" + passingRoleDateID + "/" + status,
    );
    return JsonParser.deserializeArray(data.PassingQueues, QueueDM);
  }

  public async QueueListByHour(passingRoleHourCode: string) {
    const data: any = await this.httpRequest.GET(
      "/" + "api/PassingQueue/QueueListByHour/" + passingRoleHourCode,
    );
    return JsonParser.deserializeArray(data.PassingQueues, QueueDM);
  }

  public async AddManualQueue(
    psMobileNo: string,
    passingRoleHourID: string,
    psFirstName: string,
    psLastName: string,
    psFatherName: string,
    psInfoID: string,
    passengers: any,
  ) {
    const params = {
      PsMobileNo: psMobileNo,
      PassingRoleHourID: passingRoleHourID,
      PsFirstName: psFirstName,
      PsLastName: psLastName,
      PsFatherName: psFatherName,
      PsInfoID: psInfoID,
      Passengers: passengers,
    };
    const data: any = await this.httpRequest.POST(
      "/" + "api/PassingQueue/AddManualQueue",
      params,
    );
    return JsonParser.deserializeObject(data.PassingQueue, PassengerInfoDM);
  }

  public async AddManualQueueTC(nationalID: string, passingRoleHourID: string) {
    const params = {
      NationalID: nationalID,
      PassingRoleHourID: passingRoleHourID,
    };
    const data: any = await this.httpRequest.POST(
      "/" + "api/PassingQueue/AddManualQueueBL",
      params,
    );
    if (data.Error.ErrorCode == 0) {
      return JsonParser.deserializeObject(data.PassingQueue, PassengerInfoDM);
    } else {
      return JsonParser.deserializeObject(data.Error, PassengerInfoErrorDM);
    }
  }

  public async ManualQueueList(fromDate: string, toDate: string) {
    const data: any = await this.httpRequest.GET(
      "/" + "api/PassingQueue/ManualQueueList/" + fromDate + "/" + toDate,
    );
    return JsonParser.deserializeArray(data.PassingQueues, PassengerInfoDM);
  }

  public async LastPsQueueList() {
    const data: any = await this.httpRequest.GET(
      "/" + "api/PassingQueue/LastPsQueueList",
    );
    return JsonParser.deserializeArray(data.PassingQueues, PassengerInfoDM);
  }

  public async InvalidPSInfo(passingQueueID: string) {
    const params = {
      PassingQueueID: passingQueueID,
    };
    await this.httpRequest.POST("/PassingQueue/InvalidPSInfo", params);
  }
}
