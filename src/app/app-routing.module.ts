import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/public/home/home.component";
import { LoginComponent } from "./components/admin/login/login.component";
import { SlotsComponent } from "./components/public/slots/slots.component";
import { UserAuthGuard } from "./guards/user-auth.guard";
import { Links } from "./utils/links";
import { RootComponent } from "./components/root/root.component";
import { DashboardComponent } from "./components/admin/dashboard/dashboard/dashboard.component";
import { AuthGuard } from "./guards/auth.guard";
import { CapacityListComponent } from "./components/admin/capacity-list/capacity-list.component";
import { RegisterCrossingComponent } from "./components/admin/register-crossing/register-crossing.component";
import { PaymentResultComponent } from "./components/public/payment-result/payment-result.component";
import { QueueListComponent } from "./components/admin/queue-list/queue-list.component";

const routes: Routes = [
  {
    path: Links.dashboard.name,
    component: DashboardComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: Links.capacityList.name,
        component: CapacityListComponent,
      },
      {
        path: Links.queueList.name,
        component: QueueListComponent,
      },
      {
        path: Links.registerCrossing.name,
        component: RegisterCrossingComponent,
      },
    ],
  },
  {
    path: "",
    component: RootComponent,
    title: "Free Zone Plus",
    children: [
      {
        path: "",
        component: HomeComponent,
        title: "Free Zone Plus",
      },
      {
        path: Links.slots.name + "/:id",
        component: SlotsComponent,
        canActivate: [UserAuthGuard],
        title: "Free Zone Plus",
      },
    ],
  },
  {
    path: Links.paymentResult.name,
    component: PaymentResultComponent,
  },
  {
    path: Links.login.name,
    component: LoginComponent,
    title: "Free Zone Plus",
  },

  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
