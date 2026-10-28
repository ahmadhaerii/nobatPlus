import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { authGuard } from "./core/auth.guard";

export const routes: Routes = [
  { path: "", component: HomeComponent, title: "نوبت پلاس" },
  {
    path: "slots",
    canActivate: [authGuard],
    title: "نوبت پلاس",
    loadComponent: () =>
      import("./pages/slots/slots.component").then((m) => m.SlotsComponent),
  },
  { path: "**", redirectTo: "" },
];
