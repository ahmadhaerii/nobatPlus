import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../core/auth.service';
import { DaySlot, HourSlot, SlotService } from '../../core/slot.service';

@Component({
  selector: 'bp-slots',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.scss'],
})
export class SlotsComponent implements OnInit, AfterViewInit {
  private slotService = inject(SlotService);
  auth = inject(AuthService);

  @ViewChild('strip', { static: true }) stripRef!: ElementRef<HTMLElement>;

  days: DaySlot[] = [];
  hours: HourSlot[] = [];
  selectedDay: DaySlot | null = null;
  selectedHour: HourSlot | null = null;
  submitting = false;
  trackingCode = '';

  // کشیدن با ماوس/لمس
  private dragging = false;
  private moved = false;
  private startX = 0;
  private startScroll = 0;

  ngOnInit(): void {
    this.slotService.getDays().subscribe((d) => {
      this.days = d;
      const first = d.find((x) => x.hasCapacity);
      if (first) this.selectDay(first);
    });
  }

  ngAfterViewInit(): void {
    const el = this.stripRef.nativeElement;
    el.addEventListener('pointerdown', this.onDown);
    el.addEventListener('pointermove', this.onMove);
    el.addEventListener('pointerup', this.onUp);
    el.addEventListener('pointercancel', this.onUp);
    el.addEventListener('pointerleave', this.onUp);
  }

  selectDay(day: DaySlot): void {
    if (!day.hasCapacity || this.moved) return;
    this.selectedDay = day;
    this.selectedHour = null;
    this.trackingCode = '';
    this.slotService.getHours(day.iso).subscribe((h) => (this.hours = h));
  }

  selectHour(h: HourSlot): void {
    if (!h.available) return;
    this.selectedHour = this.selectedHour?.hour === h.hour ? null : h;
  }

  /** جهت دکمه‌ها نسبت به صفحه است (چپ = چپ) */
  scrollStrip(direction: 'left' | 'right'): void {
    const el = this.stripRef.nativeElement;
    const step = el.clientWidth * 0.8;
    el.scrollBy({ left: direction === 'left' ? -step : step, behavior: 'smooth' });
  }

  confirm(): void {
    if (!this.selectedDay || !this.selectedHour || this.submitting) return;
    this.submitting = true;
    this.slotService.reserve(this.selectedDay.iso, this.selectedHour.hour).subscribe({
      next: (r) => { this.trackingCode = r.trackingCode; this.submitting = false; },
      error: () => { this.submitting = false; },
    });
  }

  trackDay = (_: number, d: DaySlot) => d.iso;
  trackHour = (_: number, h: HourSlot) => h.hour;

  // ---- drag handlers ----
  private onDown = (e: PointerEvent) => {
    if (e.pointerType === 'touch') return; // لمس را مرورگر خودش اسکرول می‌کند
    this.dragging = true; this.moved = false;
    this.startX = e.clientX;
    this.startScroll = this.stripRef.nativeElement.scrollLeft;
  };
  private onMove = (e: PointerEvent) => {
    if (!this.dragging) return;
    const dx = e.clientX - this.startX;
    if (Math.abs(dx) > 5) {
      this.moved = true;
      this.stripRef.nativeElement.classList.add('is-dragging');
    }
    this.stripRef.nativeElement.scrollLeft = this.startScroll - dx;
  };
  private onUp = () => {
    if (!this.dragging) return;
    this.dragging = false;
    this.stripRef.nativeElement.classList.remove('is-dragging');
    setTimeout(() => (this.moved = false)); // بعد از click جاری
  };
}
