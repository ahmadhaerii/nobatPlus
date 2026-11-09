import { AsyncPipe, NgIf } from "@angular/common";
import { Component, inject, Input } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { NiraModalConfig } from "nira-modal";
import { Subject } from "rxjs";
import { QueueApiService } from "src/app/api/queue-api.service";
import { AppointmentBookingService } from "src/app/core/appointment-booking.service";

@Component({
  selector: "bp-appointment-booking-modal",
  standalone: true,
  imports: [NgIf, AsyncPipe, ReactiveFormsModule],
  templateUrl: "./appointment-booking-modal.component.html",
  styleUrls: ["./appointment-booking-modal.component.scss"],
})
export class AppointmentBookingModalComponent {
  @Input() config!: NiraModalConfig;
  @Input() closeSubject!: Subject<any>;
  loading = false;
  error = "";
  id: string = "";
  private fb = inject(FormBuilder);
  appointmentBooking = inject(AppointmentBookingService);
  constructor(private queueApiService: QueueApiService) {}

  ngOnInit(): void {
    this.id = this.config.data.id;
  }
  close() {
    this.closeSubject.next("true");
  }
  form = this.fb.nonNullable.group({
    chassisNumber: ["", [Validators.required, Validators.minLength(2)]],
    vehiclePlate: ["", [Validators.required, Validators.minLength(2)]],
  });

  async confirm() {
    this.loading = true;
    try {
      await this.queueApiService.addQueue(
        this.id,
        this.form.get("chassisNumber")?.value!,
        this.form.get("vehiclePlate")?.value!,
      );
    } catch (error) {
      console.error(error);
    }
    this.loading = false;
  }
}
