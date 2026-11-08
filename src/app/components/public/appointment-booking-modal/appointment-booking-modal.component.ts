import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AppointmentBookingService } from "src/app/services/appointment-booking.service";

@Component({
  selector: "bp-appointment-booking-modal",
  templateUrl: "./appointment-booking-modal.component.html",
  styleUrls: ["./appointment-booking-modal.component.scss"],
})
export class AppointmentBookingModalComponent implements OnInit {
  loading = false;
  error = "";

  constructor(
    private fb: FormBuilder,
    public appointmentBooking: AppointmentBookingService,
  ) {}

  ngOnInit(): void {
    console.log("AppointmentBookingModalComponent");
  }
  close(): void {
    this.appointmentBooking.closeAppointment();
    this.reset();
  }
  form = this.fb.nonNullable.group({
    chassisNumber: ["", [Validators.required, Validators.minLength(2)]],
    vehiclePlate: ["", [Validators.required, Validators.minLength(2)]],
  });

  private reset(): void {
    this.error = "";
    this.loading = false;
    this.form.reset();
  }

  sendOtp() {}
}
