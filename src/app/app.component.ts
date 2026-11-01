import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { LoginModalComponent } from "./shared/login-modal/login-modal.component";
import { AppointmentBookingModalComponent } from "./shared/appointment-booking-modal/appointment-booking-modal.component";

@Component({
  selector: "bp-root",
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    LoginModalComponent,
    AppointmentBookingModalComponent,
  ],
  template: `
    <div class="shell">
      <bp-header />
      <main class="content"><router-outlet /></main>
      <bp-footer />
    </div>
    <bp-login-modal />
    <bp-appointment-booking-modal />
  `,
  styles: [
    `
      .shell {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }
      .content {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
    `,
  ],
})
export class AppComponent {}
