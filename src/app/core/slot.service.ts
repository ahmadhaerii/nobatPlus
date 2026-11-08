import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Observable, delay, of } from "rxjs";
import { API } from "./api.config";
import { HttpRequestService } from "../services/http-request.service";
import { JsonParser } from "../utils/jsonparser";
import DateListDM from "../store/dataModels/dateListDM";
import DateDetailDM from "../store/dataModels/dateDetailDM";

export interface DaySlot {
  serviceRoleDate: string; // 1405-08-05
  serviceRoleDateId: string; // 1405-08-05
  dayOfWeek: string; // سه‌شنبه
  hasCapacity: boolean;
}

export interface HourSlot {
  hour: number;
  label: string; // 12:00
  period: string; // ظهر
  available: boolean;
}

export function periodOf(h: number): string {
  if (h < 11) return "صبح";
  if (h < 16) return "ظهر";
  return "عصر";
}

@Injectable({ providedIn: "root" })
export class SlotService {
  private http = inject(HttpClient);

  constructor(private httpRequest: HttpRequestService) {}
  private jalaliFmt = new Intl.DateTimeFormat("fa-IR-u-ca-persian-nu-latn", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  private weekdayFmt = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    weekday: "long",
  });

  async getDays(id: string) {
    const data: any = await this.httpRequest.GET(`/ServiceRole/DateList/` + id);
    return JsonParser.deserializeArray(data.Dates, DateListDM);
  }

  async getDateDetails(id: string) {
    const data: any = await this.httpRequest.GET(
      `/ServiceRole/DateDetails/` + id,
    );

    console.log(data.DateDetails);
    return JsonParser.deserializeArray(data.DateDetails, DateDetailDM);
  }

  // getHours(iso: string): Observable<HourSlot[]> {
  //   if (!API.useMock)
  //     return this.http.get<HourSlot[]>(`${API.baseUrl}/slots/hours`, {
  //       params: { date: iso },
  //     });
  //   const seed = iso.split("-").reduce((a, b) => a + Number(b), 0);
  //   const hours = Array.from({ length: 12 }, (_, h) => ({
  //     hour: h + 6,
  //     label: `${String(h + 6).padStart(2, "0")}:00`,
  //     period: periodOf(h + 6),
  //     available: h + 6 >= 12 || ((h + 6) * 7 + seed) % 3 === 0, // داده آزمایشی
  //   }));
  //   return of(hours).pipe(delay(200));
  // }

  reserve(iso: string, hour: string): Observable<{ trackingCode: string }> {
    if (!API.useMock)
      return this.http.post<{ trackingCode: string }>(
        `${API.baseUrl}/slots/reserve`,
        { date: iso, hour },
      );
    return of({
      trackingCode: String(Math.floor(100000 + Math.random() * 900000)),
    }).pipe(delay(600));
  }
}
