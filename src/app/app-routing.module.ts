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

const routes: Routes = [
  {
    path: Links.dashboard.name,
    component: DashboardComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      // {
      //   path: Links.adminTurnInquiry.name,
      //   component: AdminTurnInquiryComponent,
      // },
      // { path: Links.dashboardHome.name, component: DashboardHomeComponent },
      {
        path: Links.capacityList.name,
        component: CapacityListComponent,
      },
      {
        path: Links.registerCrossing.name,
        component: RegisterCrossingComponent,
      },
      // {
      //   path: Links.capacityManagement.name + "/:selectedPassingRoleDateID",
      //   component: CapacityManagementComponent,
      // },
      // { path: Links.crossingList.name, component: CrossingListComponent },
      // {
      //   path: Links.lastAddedQueueList.name,
      //   component: LastAddedQueueListComponent,
      // },
      // {
      //   path: Links.manualQueueList.name,
      //   component: ManualQueueListComponent,
      // },
      // {
      //   path: Links.queueListByDate.name + "/:selectedPassingRoleDateID",
      //   component: QueueListByDateComponent,
      // },
      // {
      //   path: Links.registerCrossing.name,
      //   component: RegisterCrossingComponent,
      // },
    ],
  },
  {
    path: "",
    component: RootComponent,
    title: "نوبت پلاس",
    children: [
      {
        path: "",
        component: HomeComponent,
        title: "نوبت پلاس",
      },
      {
        path: Links.slots.name + "/:id",
        component: SlotsComponent,
        canActivate: [UserAuthGuard],
        title: "نوبت پلاس",
      },
    ],
  },
  { path: Links.login.name, component: LoginComponent, title: "نوبت پلاس" },

  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
