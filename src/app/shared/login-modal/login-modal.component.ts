import { Component, OnDestroy, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, interval, take } from 'rxjs';
import { AuthService, UserProfile } from '../../core/auth.service';
import { mobileValidator, nationalCodeValidator, toEnglishDigits } from '../../core/utils';

type Step = 'mobile' | 'otp' | 'profile';

@Component({
  selector: 'bp-login-modal',
  standalone: true,
  imports: [NgIf, AsyncPipe, ReactiveFormsModule],
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnDestroy {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  auth = inject(AuthService);

  step: Step = 'mobile';
  loading = false;
  error = '';
  countdown = 0;

  private token = '';
  private timerSub?: Subscription;

  mobileForm = this.fb.nonNullable.group({ mobile: ['', [Validators.required, mobileValidator]] });
  otpForm = this.fb.nonNullable.group({ code: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]] });
  profileForm = this.fb.nonNullable.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    nationalCode: ['', [Validators.required, nationalCodeValidator]],
  });

  private get mobile(): string { return toEnglishDigits(this.mobileForm.controls.mobile.value); }

  /** ارقام فارسی را هنگام تایپ به انگلیسی تبدیل می‌کند */
  normalize(ctrl: { setValue: (v: string) => void }, event: Event): void {
    const el = event.target as HTMLInputElement;
    const v = toEnglishDigits(el.value);
    if (v !== el.value) { el.value = v; ctrl.setValue(v); }
  }

  sendOtp(): void {
    if (this.mobileForm.invalid) { this.mobileForm.markAllAsTouched(); return; }
    this.loading = true; this.error = '';
    this.auth.sendOtp(this.mobile).subscribe({
      next: () => { this.loading = false; this.step = 'otp'; this.startTimer(); },
      error: () => { this.loading = false; this.error = 'ارسال پیامک ناموفق بود. دوباره تلاش کنید.'; },
    });
  }

  verifyOtp(): void {
    if (this.otpForm.invalid) { this.otpForm.markAllAsTouched(); return; }
    this.loading = true; this.error = '';
    this.auth.verifyOtp(this.mobile, this.otpForm.controls.code.value).subscribe({
      next: (res) => {
        this.loading = false;
        this.token = res.token;
        if (res.isNewUser || !res.profile) {
          this.step = 'profile';
        } else {
          this.auth.loginExisting(res.profile, res.token);
          this.finish();
        }
      },
      error: () => { this.loading = false; this.error = 'کد وارد شده صحیح نیست.'; },
    });
  }

  register(): void {
    if (this.profileForm.invalid) { this.profileForm.markAllAsTouched(); return; }
    this.loading = true; this.error = '';
    const v = this.profileForm.getRawValue();
    const profile: UserProfile = {
      firstName: v.firstName.trim(),
      lastName: v.lastName.trim(),
      nationalCode: toEnglishDigits(v.nationalCode),
      mobile: this.mobile,
    };
    this.auth.register(profile, this.token).subscribe({
      next: () => { this.loading = false; this.finish(); },
      error: () => { this.loading = false; this.error = 'ثبت‌نام انجام نشد. دوباره تلاش کنید.'; },
    });
  }

  editMobile(): void { this.step = 'mobile'; this.error = ''; this.otpForm.reset(); this.stopTimer(); }

  resend(): void { if (this.countdown === 0) this.sendOtp(); }

  close(): void {
    this.auth.closeLogin();
    this.reset();
  }

  private finish(): void {
    this.auth.closeLogin();
    this.reset();
    this.router.navigate(['/']);
  }

  private reset(): void {
    this.step = 'mobile'; this.error = ''; this.loading = false; this.token = '';
    this.mobileForm.reset(); this.otpForm.reset(); this.profileForm.reset();
    this.stopTimer();
  }

  private startTimer(seconds = 120): void {
    this.stopTimer();
    this.countdown = seconds;
    this.timerSub = interval(1000).pipe(take(seconds)).subscribe(() => this.countdown--);
  }
  private stopTimer(): void { this.timerSub?.unsubscribe(); this.countdown = 0; }

  get timerText(): string {
    const m = Math.floor(this.countdown / 60), s = this.countdown % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  ngOnDestroy(): void { this.stopTimer(); }
}
