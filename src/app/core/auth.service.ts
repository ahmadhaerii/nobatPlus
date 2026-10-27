import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, delay, of, tap, throwError } from 'rxjs';
import { API } from './api.config';

export interface UserProfile {
  firstName: string;
  lastName: string;
  nationalCode: string;
  mobile: string;
}

export interface VerifyResult {
  token: string;
  isNewUser: boolean;
  profile?: UserProfile;
}

const STORAGE_KEY = 'bp_session';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  private userSubject = new BehaviorSubject<UserProfile | null>(this.restore());
  readonly user$ = this.userSubject.asObservable();

  private modalSubject = new BehaviorSubject<boolean>(false);
  readonly modalOpen$ = this.modalSubject.asObservable();

  get user(): UserProfile | null { return this.userSubject.value; }
  get isLoggedIn(): boolean { return !!this.user; }
  get token(): string | null { return this.readSession()?.token ?? null; }

  openLogin(): void { this.modalSubject.next(true); }
  closeLogin(): void { this.modalSubject.next(false); }

  /** مرحله ۱: ارسال پیامک حاوی کد */
  sendOtp(mobile: string): Observable<void> {
    if (API.useMock) return of(void 0).pipe(delay(600));
    return this.http.post<void>(`${API.baseUrl}/auth/send-otp`, { mobile });
  }

  /** مرحله ۲: بررسی کد پیامک؛ اگر کاربر جدید بود isNewUser=true */
  verifyOtp(mobile: string, code: string): Observable<VerifyResult> {
    if (API.useMock) {
      if (code !== API.mockOtp) return throwError(() => new Error('invalid-otp')).pipe(delay(500));
      return of<VerifyResult>({ token: 'mock-token', isNewUser: true }).pipe(delay(500));
    }
    return this.http.post<VerifyResult>(`${API.baseUrl}/auth/verify-otp`, { mobile, code });
  }

  /** کاربر جدید: ثبت نام و ورود */
  register(data: UserProfile, token: string): Observable<UserProfile> {
    const req$: Observable<UserProfile> = API.useMock
      ? of(data).pipe(delay(500))
      : this.http.post<UserProfile>(`${API.baseUrl}/auth/register`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
    return req$.pipe(tap((p) => this.setSession(p, token)));
  }

  /** کاربر قدیمی: فقط ورود */
  loginExisting(profile: UserProfile, token: string): void {
    this.setSession(profile, token);
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.userSubject.next(null);
  }

  private setSession(profile: UserProfile, token: string): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ profile, token }));
    this.userSubject.next(profile);
  }

  private readSession(): { profile: UserProfile; token: string } | null {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null');
    } catch { return null; }
  }

  private restore(): UserProfile | null {
    return this.readSession()?.profile ?? null;
  }
}
