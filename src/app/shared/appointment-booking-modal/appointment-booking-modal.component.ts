import { AsyncPipe, NgIf } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { AppointmentBookingService } from "src/app/core/appointment-booking.service";

@Component({
  selector: "bp-appointment-booking-modal",
  standalone: true,
  imports: [NgIf, AsyncPipe, ReactiveFormsModule],
  templateUrl: "./appointment-booking-modal.component.html",
  styleUrls: ["./appointment-booking-modal.component.scss"],
})
export class AppointmentBookingModalComponent {
  loading = false;
  error = "";

  private fb = inject(FormBuilder);
  appointmentBooking = inject(AppointmentBookingService);
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
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
