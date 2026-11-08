import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, retry, throwError } from "rxjs";
import { isDevMode } from "@angular/core";
import { API } from "../utils/api.config";
import { AuthService } from "./auth.service";
import { NiraSnackBarService } from "nira-snack-bar";

@Injectable({
  providedIn: "root",
})
export class HttpRequestService {
  url: any = API.baseUrl;
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private niraSnackBar: NiraSnackBarService,
  ) {
    if (isDevMode()) {
      this.url = API.baseUrl;
    }
  }
  public async GET(path: string) {
    return await new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers = headers.set("Content-Type", "application/json");
      const authorization = localStorage.getItem("AccessToken");
      if (authorization) {
        headers = headers.set("Authorization", authorization);
      }
      this.http
        .get<any>(this.url + path, {
          headers: headers,
          observe: "response",
        })
        .pipe(
          retry(3),
          catchError((error) => {
            this.handleError(error);
            reject(error);
            return throwError(
              () =>
                new Error("Something bad happened; please try again later."),
            );
          }),
        )
        .subscribe((response) => {
          if (response.status === 204) {
            this.showError("موردی یافت نشد");
            catchError(this.handleResponseCode.bind(this));
            reject("204");
          } else {
            resolve(response.body);
          }
        });
    });
  }
  isPersian(str: string) {
    var p = /^[\u0600-\u06FF\s]+$/;
    str = (str + "").replace(/\d+/g, "");
    return p.test(str);
  }
  public async POST(path: string, params: any) {
    return await new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers = headers.set("Content-Type", "application/json");
      const authorization = localStorage.getItem("AccessToken");
      if (authorization) {
        headers = headers.set("Authorization", authorization);
      }
      this.http
        .post<any>(this.url + path, params, {
          headers: headers,
        })
        .pipe(catchError(this.handleError.bind(this)))
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            reject(error);
          },
        );
    });
  }

  public async PUT(path: string, params: any) {
    return await new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers = headers.set("Content-Type", "application/json");
      const authorization = localStorage.getItem("AccessToken");
      if (authorization) {
        headers = headers.set("Authorization", authorization);
      }
      this.http
        .put<any>(this.url + path, params, {
          headers: headers,
        })
        .pipe(catchError(this.handleError.bind(this)))
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            reject(error);
          },
        );
    });
  }
  public async DELETE(path: string) {
    return await new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers = headers.set("Content-Type", "application/json");
      const authorization = localStorage.getItem("AccessToken");
      if (authorization) {
        headers = headers.set("Authorization", authorization);
      }
      this.http
        .delete<any>(this.url + path, {
          headers: headers,
        })
        .pipe(catchError(this.handleError.bind(this)))
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            reject(error);
          },
        );
    });
  }

  private handleResponseCode(error: HttpErrorResponse) {
    return throwError(
      () => new Error("Something bad happened; please try again later."),
    );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      this.showError(" خطا در اتصال به سرور ");
      console.error("An error occurred:", error.error);
    } else if (error.status === 400 || error.status === 403) {
      console.error(error);
      this.showError(error.error.Error.ErrorText_Fa);
    } else if (error.status === 404) {
      console.error(error);
      this.showError("موردی یافت نشد");
    } else if (error.status === 401) {
      this.showError("لطفا دوباره وارد شوید");
      this.authService.logout();
      this.router.navigate(["/"]);
    } else {
      this.showError(" خطا در اتصال به سرور ");
      console.error(error);
    }
    return throwError(() => new Error(error.error.description_fa));
  }

  showError(message: string) {
    this.niraSnackBar.show(message, {
      statusClass: "error",
      duration: 5000,
    });
  }
}
