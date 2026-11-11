import { Injector, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { declarationIcons } from "./icons.module";
import { declarationCores } from "./core.module";

import { LoginComponent } from "./components/admin/login/login.component";
import { AppointmentBookingModalComponent } from "./components/public/appointment-booking-modal/appointment-booking-modal.component";
import { FooterComponent } from "./components/public/footer/footer.component";
import { HeaderComponent } from "./components/public/header/header.component";
import { HomeComponent } from "./components/public/home/home.component";
import { LoginModalComponent } from "./components/public/login-modal/login-modal.component";
import { SlotsComponent } from "./components/public/slots/slots.component";

import { DigitGroupPipe } from "./utils/pipes/digit-group.pipe";
import { FormControlPipe } from "./utils/pipes/form-control.pipe";
import { PersianDigitsPipe } from "./utils/pipes/persian-digits.pipe";
import { PersianTextDigitsPipe } from "./utils/pipes/persian-text-digits.pipe";
import { PriceFormatPipe } from "./utils/pipes/price-format.pipe";
import { ShamsiDatePipe } from "./utils/pipes/shamsi-date.pipe";
import { SupervisorPipe } from "./utils/pipes/supervisor.pipe";
import { TimeFormatPipe } from "./utils/pipes/time-format.pipe";
import { RootComponent } from "./components/root/root.component";
import { DashboardHeaderComponent } from "./components/admin/dashboard/dashboard-header/dashboard-header.component";
import { DashboardContentComponent } from "./components/admin/dashboard/dashoard-content/dashoard-content.component";
import { SlideMenuComponent } from "./components/admin/dashboard/slide-menu/slide-menu.component";
import { MessageLogoutDialogComponent } from "./components/admin/dashboard/slide-menu/message-logout-dialog/message-logout-dialog.component";
import { DashboardComponent } from "./components/admin/dashboard/dashboard/dashboard.component";
import { CapacityListComponent } from "./components/admin/capacity-list/capacity-list.component";
import { NiraModalModule, NiraModalService } from "nira-modal";
import { CommonModule } from "@angular/common";
import { NgOtpInputModule } from "ng-otp-input";
import { NiraSnackBarModule } from "nira-snack-bar";
import { NiraDatePickerModule } from "nira-date-picker";
import { NgxPrintModule } from "ngx-print";
import { NgxIndexedDBModule } from "ngx-indexed-db";
import { DbConfig } from "./store/dbConfig";
import { FilterTableDirective } from "./utils/directives/filterTableDirective";
import { RegisterCrossingComponent } from "./components/admin/register-crossing/register-crossing.component";
import { ManualQueueFormDialogComponent } from "./components/dialog/manual-queue-form-dialog/manual-queue-form-dialog.component";
import { QueueListByHourDialogComponent } from "./components/dialog/queue-list-by-hour-dialog/queue-list-by-hour-dialog.component";
import { AddManualQueueTcDialogComponent } from "./components/dialog/add-manual-queue-tc-dialog/add-manual-queue-tc-dialog.component";
import { PaymentResultComponent } from "./components/public/payment-result/payment-result.component";
export let AppInjector: Injector;
@NgModule({
  declarations: [
    RootComponent,
    AppComponent,
    AppointmentBookingModalComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    LoginModalComponent,
    SlotsComponent,
    DashboardComponent,
    DashboardHeaderComponent,
    DashboardContentComponent,
    SlideMenuComponent,
    MessageLogoutDialogComponent,
    CapacityListComponent,
    RegisterCrossingComponent,
    ManualQueueFormDialogComponent,
    QueueListByHourDialogComponent,
    AddManualQueueTcDialogComponent,
    PaymentResultComponent,

    FilterTableDirective,
    DigitGroupPipe,
    FormControlPipe,
    PersianDigitsPipe,
    PersianTextDigitsPipe,
    PriceFormatPipe,
    ShamsiDatePipe,
    SupervisorPipe,
    TimeFormatPipe,
    declarationIcons,
    declarationCores,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOtpInputModule,
    FormsModule,
    NiraModalModule,
    NiraSnackBarModule,
    HttpClientModule,
    NiraDatePickerModule,
    ReactiveFormsModule,
    NgxPrintModule,
    NgxIndexedDBModule.forRoot(DbConfig),
  ],
  exports: [
    DigitGroupPipe,
    FormControlPipe,
    PersianDigitsPipe,
    PersianTextDigitsPipe,
    PriceFormatPipe,
    TimeFormatPipe,
    ShamsiDatePipe,
  ],
  providers: [
    {
      provide: "NiraModalService",
      useClass: NiraModalService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
    AppInjector = this.injector;
  }
}
