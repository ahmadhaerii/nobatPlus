import { Component } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter, map, startWith } from "rxjs";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "bp-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  isSlotsPage$ = this.router.events.pipe(
    filter((e) => e instanceof NavigationEnd),
    startWith(null),
    map(() => this.router.url.startsWith("/slots")),
  );

  constructor(
    private router: Router,
    public auth: AuthService,
  ) {}

  goHome(): void {
    this.router.navigate(["/"]);
  }
  login(): void {
    this.auth.openLogin();
  }
  logout(): void {
    this.auth.logout();
    this.router.navigate(["/"]);
  }
}
