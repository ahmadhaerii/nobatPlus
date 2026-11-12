import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NiraModalConfig } from "nira-modal";
import { Subject } from "rxjs";
import { QueueApiService } from "src/app/api/queue-api.service";
import { AppointmentBookingService } from "src/app/services/appointment-booking.service";
import { Links } from "src/app/utils/links";

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
    private router: Router,
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
      const result = await this.queueApiService.addQueue(
        this.id,
        this.form.get("chassisNumber")?.value!,
        this.form.get("vehiclePlate")?.value!,
      );
      this.close();
      this.router.navigate(["/payment-result"], {
        queryParams: {
          ID: result.pgReference,
          status: "Success",
          result: JSON.stringify(result),
        },
      });
    } catch (error: any) {
      console.error(error);
      this.error = error.ErrorText_Fa;
    }
    this.loading = false;
  }
}
