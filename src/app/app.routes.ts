import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { authGuard } from "./core/auth.guard";
import { LoginComponent } from "./pages/login/login.component";

export const routes: Routes = [
  { path: "", component: HomeComponent, title: "Free Zone Plus" },
  { path: "login", component: LoginComponent, title: "Free Zone Plus" },
  {
    path: "slots/:id",
    canActivate: [authGuard],
    title: "Free Zone Plus",
    loadComponent: () =>
      import("./pages/slots/slots.component").then((m) => m.SlotsComponent),
  },
  { path: "**", redirectTo: "" },
];
