import { Component, OnDestroy } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription, interval, take } from "rxjs";
import { AuthService, UserProfile } from "../../../services/auth.service";
import {
  mobileValidator,
  nationalCodeValidator,
  toEnglishDigits,
} from "../../../utils/validators";

type Step = "mobile" | "otp" | "profile" | "login" | "reset";

@Component({
  selector: "bp-login-modal",
  templateUrl: "./login-modal.component.html",
  styleUrls: ["./login-modal.component.scss"],
})
export class LoginModalComponent implements OnDestroy {
  step: Step = "mobile";
  loading = false;
  error = "";
  info = "";
  countdown = 0;

  /** تنظیمات باکس‌های کد تایید (۴ رقم) */
  readonly otpLength = 4;
  readonly otpConfig = {
    length: 4,
    allowNumbersOnly: true,
    inputClass: "otp-box",
    containerClass: "otp-wrap",
    placeholder: "",
  };
  /** با تغییر این عدد، باکس‌های کد دوباره ساخته و خالی می‌شوند */
  otpKey = 0;

  private token = "";
  private timerSub?: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public auth: AuthService,
  ) {}

  mobileForm = this.fb.nonNullable.group({
    mobile: ["", [Validators.required, mobileValidator]],
  });
  loginForm = this.fb.nonNullable.group({
    password: ["", [Validators.required]],
  });
  otpForm = this.fb.nonNullable.group({
    code: ["", [Validators.required, Validators.minLength(4)]],
  });
  resetForm = this.fb.nonNullable.group({
    code: ["", [Validators.required, Validators.minLength(4)]],
    password: ["", [Validators.required]],
  });
  profileForm = this.fb.nonNullable.group({
    firstName: ["", [Validators.required, Validators.minLength(2)]],
    lastName: ["", [Validators.required, Validators.minLength(2)]],
    fatherName: ["", [Validators.required, Validators.minLength(2)]],
    nationalCode: ["", [Validators.required, nationalCodeValidator]],
    password: ["", [Validators.required]],
  });

  private get mobile(): string {
    return toEnglishDigits(this.mobileForm.controls.mobile.value);
  }

  /** ارقام فارسی را هنگام تایپ به انگلیسی تبدیل می‌کند */
  normalize(ctrl: { setValue: (v: string) => void }, event: Event): void {
    const el = event.target as HTMLInputElement;
    const v = toEnglishDigits(el.value);
    if (v !== el.value) {
      el.value = v;
      ctrl.setValue(v);
    }
  }

  sendOtp(): void {
    if (this.mobileForm.invalid) {
      this.mobileForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.error = "";
    this.info = "";
    this.auth.sendOtp(this.mobile).subscribe({
      next: (result: any) => {
        this.loading = false;
        this.step = result.Profile.Registered ? "login" : "otp";
        this.otpKey++;
        this.startTimer();
      },
      error: () => {
        this.loading = false;
        this.error = "ارسال پیامک ناموفق بود. دوباره تلاش کنید.";
      },
    });
  }
  sendLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.error = "";
    this.auth
      .sendLogin(this.mobile, this.loginForm.controls.password.value)
      .subscribe({
        next: (result: any) => {
          this.loading = false;
          localStorage.setItem("isLogin", "true");
          localStorage.setItem("AccessToken", result.Token.AccessToken);
          localStorage.setItem("LastName", result.Token.LastName);
          localStorage.setItem("Name", result.Token.Name);
          localStorage.setItem("ProfileMobileNo", result.Token.ProfileMobileNo);
          const profile: UserProfile = {
            firstName: result.Token.Name,
            lastName: result.Token.LastName,
            nationalCode: "",
            mobile: result.Token.ProfileMobileNo,
            fatherName: "",
            password: "",
          };
          this.auth.loginExisting(profile, result.Token.AccessToken);
          this.finish();
        },
        error: () => {
          this.loading = false;
          this.error =
            "کد کاربر یا کلمه عبور اشتباه می باشد . دوباره تلاش کنید.";
        },
      });
  }

  /** هر بار که کاربر یکی از ۴ باکس را پر می‌کند؛ با رقم چهارم خودکار API صدا زده می‌شود */
  onOtpChange(value: string): void {
    const code = toEnglishDigits(value ?? "");
    this.otpForm.controls.code.setValue(code);
    this.error = "";
    if (code.length === this.otpLength && !this.loading) {
      this.verifyOtp();
    }
  }

  onResetOtpChange(value: string): void {
    this.resetForm.controls.code.setValue(toEnglishDigits(value ?? ""));
    this.error = "";
  }

  /** فراموشی رمز - مرحله ۱: ارسال کد تایید */
  forgotPassword(): void {
    this.loading = true;
    this.error = "";
    this.info = "";
    this.auth.forgotPassword(this.mobile).subscribe({
      next: () => {
        this.loading = false;
        this.resetForm.reset();
        this.otpKey++;
        this.step = "reset";
        this.startTimer();
      },
      error: () => {
        this.loading = false;
        this.error = "ارسال کد تایید ناموفق بود. دوباره تلاش کنید.";
      },
    });
  }

  /** فراموشی رمز - مرحله ۲: تغییر رمز عبور */
  changePassword(): void {
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.error = "";
    const v = this.resetForm.getRawValue();
    this.auth
      .changePassword(this.mobile, v.code, v.password.trim())
      .subscribe({
        next: (result: any) => {
          this.loading = false;
          const code = result?.Error?.ErrorCode;
          if (code !== undefined && code !== 0) {
            this.error =
              result?.Error?.ErrorText_Fa || "تغییر رمز عبور انجام نشد.";
            return;
          }
          this.resetForm.reset();
          this.loginForm.reset();
          this.stopTimer();
          this.info = "رمز عبور با موفقیت تغییر کرد. وارد شوید.";
          this.step = "login";
        },
        error: () => {
          this.loading = false;
          this.error = "کد وارد شده یا رمز عبور صحیح نیست.";
        },
      });
  }

  backToLogin(): void {
    this.step = "login";
    this.error = "";
    this.info = "";
    this.stopTimer();
  }

  verifyOtp(): void {
    if (this.otpForm.invalid) {
      this.otpForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.error = "";
    this.auth
      .verifyOtp(this.mobile, this.otpForm.controls.code.value)
      .subscribe({
        next: (res) => {
          this.loading = false;
          this.token = res.token;
          if (res.isNewUser || !res.profile) {
            this.step = "profile";
          } else {
            this.auth.loginExisting(res.profile, res.token);
            this.finish();
          }
        },
        error: () => {
          this.loading = false;
          this.error = "کد وارد شده صحیح نیست.";
          this.otpForm.reset();
          this.otpKey++; // خالی کردن باکس‌ها برای تلاش دوباره
        },
      });
  }

  register(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.error = "";
    const v = this.profileForm.getRawValue();
    const profile: UserProfile = {
      firstName: v.firstName.trim(),
      lastName: v.lastName.trim(),
      nationalCode: toEnglishDigits(v.nationalCode),
      mobile: this.mobile,
      fatherName: v.fatherName.trim(),
      password: v.password.trim(),
    };
    this.auth.register(profile, this.token).subscribe({
      next: () => {
        this.loading = false;
        this.finish();
      },
      error: () => {
        this.loading = false;
        this.error = "ثبت‌نام انجام نشد. دوباره تلاش کنید.";
      },
    });
  }

  editMobile(): void {
    this.step = "mobile";
    this.error = "";
    this.info = "";
    this.otpForm.reset();
    this.resetForm.reset();
    this.stopTimer();
  }

  resend(): void {
    if (this.countdown === 0) this.sendOtp();
  }

  close(): void {
    this.auth.closeLogin();
    this.reset();
  }

  private finish(): void {
    this.auth.closeLogin();
    this.reset();
    this.router.navigate(["/"]);
  }

  private reset(): void {
    this.step = "mobile";
    this.error = "";
    this.info = "";
    this.loading = false;
    this.token = "";
    this.mobileForm.reset();
    this.loginForm.reset();
    this.otpForm.reset();
    this.resetForm.reset();
    this.profileForm.reset();
    this.stopTimer();
  }

  private startTimer(seconds = 120): void {
    this.stopTimer();
    this.countdown = seconds;
    this.timerSub = interval(1000)
      .pipe(take(seconds))
      .subscribe(() => this.countdown--);
  }
  private stopTimer(): void {
    this.timerSub?.unsubscribe();
    this.countdown = 0;
  }

  get timerText(): string {
    const m = Math.floor(this.countdown / 60),
      s = this.countdown % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }
}
