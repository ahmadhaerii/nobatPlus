import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { DaySlot, HourSlot, SlotApiService } from "src/app/api/slot-api.service";
import { AppointmentBookingService } from "src/app/services/appointment-booking.service";
import DateListDM from "src/app/store/dataModels/dateListDM";
import { ActivatedRoute } from "@angular/router";
import DateDetailDM from "src/app/store/dataModels/dateDetailDM";

@Component({
  selector: "bp-slots",
  templateUrl: "./slots.component.html",
  styleUrls: ["./slots.component.scss"],
})
export class SlotsComponent implements OnInit, AfterViewInit {
  @ViewChild("strip", { static: true }) stripRef!: ElementRef<HTMLElement>;

  days: DateListDM[] = [];
  hours: DateDetailDM[] = [];
  selectedDay: DateListDM | null = null;
  selectedHour: DateDetailDM | null = null;
  submitting = false;
  trackingCode = "";

  // کشیدن با ماوس/لمس
  private dragging = false;
  private moved = false;
  private startX = 0;
  private startScroll = 0;

  id: string | null = null;

  constructor(
    private slotApi: SlotApiService,
    public appointmentBooking: AppointmentBookingService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    // دریافت مقدار ID از URL
    this.route.paramMap.subscribe(async (params) => {
      this.id = params.get("id");
      if (this.id) {
        await this.getList(this.id);
      }
    });
  }

  async getList(id: string) {
    try {
      this.days = await this.slotApi.getDays(id);
      console.log(this.days);
      const first = this.days.find((x) => x.hasCapacity);
      console.log(first);
      if (first) this.getDateDetails(first);
    } catch (error) {}
  }

  async getDateDetails(day: DateListDM) {
    console.log(this.moved);
    console.log(!day.hasCapacity);
    try {
      if (!day.hasCapacity || this.moved) return;
      this.selectedDay = day;
      console.log(this.selectedDay);
      this.selectedHour = null;
      this.trackingCode = "";
      this.hours = await this.slotApi.getDateDetails(day.serviceRoleDateId);
      console.log(this.hours);
    } catch (error) {}
  }
  ngAfterViewInit(): void {
    const el = this.stripRef.nativeElement;
    el.addEventListener("pointerdown", this.onDown);
    el.addEventListener("pointermove", this.onMove);
    el.addEventListener("pointerup", this.onUp);
    el.addEventListener("pointercancel", this.onUp);
    el.addEventListener("pointerleave", this.onUp);
  }

  selectHour(h: DateDetailDM): void {
    if (h.available === "0") return;
    this.selectedHour = this.selectedHour?.hour === h.hour ? null : h;
  }

  scrollStrip(direction: "left" | "right"): void {
    const el = this.stripRef.nativeElement;
    const step = el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  }

  confirm(): void {
    this.appointmentBooking.openAppointment();
    if (!this.selectedDay || !this.selectedHour || this.submitting) return;
    this.submitting = true;
    this.slotApi
      .reserve(this.selectedDay.serviceRoleDateId, this.selectedHour.hour)
      .subscribe({
        next: (r) => {
          this.trackingCode = r.trackingCode;
          this.submitting = false;
        },
        error: () => {
          this.submitting = false;
        },
      });
  }

  trackDay = (_: number, d: DaySlot) => d.serviceRoleDateId;
  trackHour = (_: number, h: HourSlot) => h.hour;

  // ---- drag handlers ----
  private onDown = (e: PointerEvent) => {
    if (e.pointerType === "touch") return; // لمس را مرورگر خودش اسکرول می‌کند
    this.dragging = true;
    this.moved = false;
    this.startX = e.clientX;
    this.startScroll = this.stripRef.nativeElement.scrollLeft;
  };
  private onMove = (e: PointerEvent) => {
    if (!this.dragging) return;
    const dx = e.clientX - this.startX;
    if (Math.abs(dx) > 5) {
      this.moved = true;
      this.stripRef.nativeElement.classList.add("is-dragging");
    }
    this.stripRef.nativeElement.scrollLeft = this.startScroll - dx;
  };
  private onUp = () => {
    if (!this.dragging) return;
    this.dragging = false;
    this.stripRef.nativeElement.classList.remove("is-dragging");
    setTimeout(() => (this.moved = false)); // بعد از click جاری
  };
}
