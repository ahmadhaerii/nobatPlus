import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { ILoginLabel, Labels } from "./login.label";
import { HttpRequestService } from "src/app/services/http-request.service";
import { LoginApiService } from "src/app/core/login-api.service";
import { HomeIconComponent } from "src/app/svg-icons/home-icon/home-icon.component";
import { Links } from "src/app/utils/links";
import { CoreInputComponent } from "src/app/component/core-input/core-input.component";
import { FormControlPipe } from "src/app/utils/pipes/form-control.pipe";
import { CoreCheckboxComponent } from "src/app/component/core-checkbox/core-checkbox.component";
import { CoreBtnComponent } from "src/app/component/core-btn/core-btn.component";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    HomeIconComponent,
    RouterLink,
    CoreInputComponent,
    FormControlPipe,
    CoreCheckboxComponent,
    CoreBtnComponent,
  ],
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
    try {
      this.loading = true;
      const data: any = await this.loginApi.Login(this.username, this.password);
      if (data.Error.ErrorCode === 0) {
        localStorage.setItem("AccessToken", data.Token.AccessToken);
        localStorage.setItem("accessRoles", data.Token.AccessRoles);
        localStorage.setItem("userFullName", data.Token.UserFullName);
        localStorage.setItem("userID", data.Token.UserID);
        localStorage.setItem("isLogin", "true");
        this.router.navigate(["/dashboard/dashboard-home"]);
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
