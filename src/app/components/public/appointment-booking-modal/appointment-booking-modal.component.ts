import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { NiraModalConfig } from "nira-modal";
import { Subject } from "rxjs";
import { QueueApiService } from "src/app/api/queue-api.service";
import { AppointmentBookingService } from "src/app/services/appointment-booking.service";

@Component({
  selector: "bp-appointment-booking-modal",
  templateUrl: "./appointment-booking-modal.component.html",
  styleUrls: ["./appointment-booking-modal.component.scss"],
})
export class AppointmentBookingModalComponent implements OnInit {
  @Input() config!: NiraModalConfig;
  @Input() closeSubject!: Subject<any>;
  loading = false;
  error = "";
  id = "";
  form = this.fb.nonNullable.group({
    chassisNumber: ["", [Validators.required, Validators.minLength(2)]],
    vehiclePlate: ["", [Validators.required, Validators.minLength(2)]],
  });
  constructor(
    private fb: FormBuilder,
    public appointmentBooking: AppointmentBookingService,
    private queueApiService: QueueApiService,
  ) {}
  ngOnInit(): void {
    this.id = this.config.data.id;
  }
  close() {
    this.closeSubject.next("true");
  }

  async confirm() {
    this.loading = true;
    try {
      await this.queueApiService.addQueue(
        this.id,
        this.form.get("chassisNumber")?.value!,
        this.form.get("vehiclePlate")?.value!,
      );
      this.close();
    } catch (error) {
      console.error(error);
    }
    this.loading = false;
  }
}
