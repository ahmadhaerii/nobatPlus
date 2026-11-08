import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { authGuard } from "./core/auth.guard";
import { LoginComponent } from "./pages/login/login.component";

export const routes: Routes = [
  { path: "", component: HomeComponent, title: "نوبت پلاس" },
  { path: "login", component: LoginComponent, title: "نوبت پلاس" },
  {
    path: "slots/:id",
    canActivate: [authGuard],
    title: "نوبت پلاس",
    loadComponent: () =>
      import("./pages/slots/slots.component").then((m) => m.SlotsComponent),
  },
  { path: "**", redirectTo: "" },
];
