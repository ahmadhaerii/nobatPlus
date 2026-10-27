import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, of } from 'rxjs';
import { API } from './api.config';

export interface DaySlot {
  iso: string;        // 2026-10-27  (برای ارسال به سرور)
  jalali: string;     // 1405-08-05
  weekday: string;    // سه‌شنبه
  hasCapacity: boolean;
}

export interface HourSlot {
  hour: number;
  label: string;      // 12:00
  period: string;     // ظهر
  available: boolean;
}

export function periodOf(h: number): string {
  if (h < 5) return 'بامداد';
  if (h < 11) return 'صبح';
  if (h < 17) return 'ظهر';
  if (h < 20) return 'عصر';
  return 'شب';
}

@Injectable({ providedIn: 'root' })
export class SlotService {
  private http = inject(HttpClient);

  private jalaliFmt = new Intl.DateTimeFormat('fa-IR-u-ca-persian-nu-latn', {
    year: 'numeric', month: '2-digit', day: '2-digit',
  });
  private weekdayFmt = new Intl.DateTimeFormat('fa-IR-u-ca-persian', { weekday: 'long' });

  getDays(count = 14): Observable<DaySlot[]> {
    if (!API.useMock) return this.http.get<DaySlot[]>(`${API.baseUrl}/slots/days`);
    const days: DaySlot[] = [];
    const start = new Date();
    for (let i = 0; i < count; i++) {
      const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
      const p = Object.fromEntries(this.jalaliFmt.formatToParts(d).map((x) => [x.type, x.value]));
      days.push({
        iso: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
        jalali: `${p['year']}-${p['month']}-${p['day']}`,
        weekday: this.weekdayFmt.format(d),
        hasCapacity: ![2, 3, 4, 6].includes(i % 7), // داده آزمایشی
      });
    }
    return of(days).pipe(delay(300));
  }

  getHours(iso: string): Observable<HourSlot[]> {
    if (!API.useMock) return this.http.get<HourSlot[]>(`${API.baseUrl}/slots/hours`, { params: { date: iso } });
    const seed = iso.split('-').reduce((a, b) => a + Number(b), 0);
    const hours = Array.from({ length: 24 }, (_, h) => ({
      hour: h,
      label: `${String(h).padStart(2, '0')}:00`,
      period: periodOf(h),
      available: h >= 12 || (h * 7 + seed) % 3 === 0, // داده آزمایشی
    }));
    return of(hours).pipe(delay(200));
  }

  reserve(iso: string, hour: number): Observable<{ trackingCode: string }> {
    if (!API.useMock) return this.http.post<{ trackingCode: string }>(`${API.baseUrl}/slots/reserve`, { date: iso, hour });
    return of({ trackingCode: String(Math.floor(100000 + Math.random() * 900000)) }).pipe(delay(600));
  }
}
