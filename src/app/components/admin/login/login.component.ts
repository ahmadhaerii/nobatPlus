import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ILoginLabel, Labels } from "./login.label";
import { HttpRequestService } from "src/app/services/http-request.service";
import { LoginApiService } from "src/app/api/login-api.service";
import { Links } from "src/app/utils/links";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  username = "";
  password = "";
  error: string = "";
  loading: boolean = false;

  get labels(): ILoginLabel {
    return Labels;
  }

  get links() {
    return Links;
  }
  constructor(
    private router: Router,
    private loginApi: LoginApiService,
    private httpService: HttpRequestService,
  ) {}
  loginForm: FormGroup = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });

  async login() {
    if (this.loginForm.invalid) {
      return;
    }
    console.log("login");
    try {
      this.loading = true;
      const data: any = await this.loginApi.Login(this.username, this.password);
      if (data.Error.ErrorCode === 0) {
        localStorage.setItem("AccessToken", data.Token.AccessToken);
        localStorage.setItem("accessRoles", data.Token.AccessRoles);
        localStorage.setItem("userFullName", data.Token.UserFullName);
        localStorage.setItem("userID", data.Token.UserID);
        localStorage.setItem("isLogin", "true");
        this.router.navigate(["/dashboard"]);
      }
      this.loading = false;
    } catch (error) {
      if (typeof error === "string") {
        this.error = error.toString();
      } else if (error instanceof Error) {
        this.error = error.message;
      }
      this.loading = false;
    }
  }
}
