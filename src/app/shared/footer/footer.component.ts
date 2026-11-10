import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "bp-footer",
  standalone: true,
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent {
  constructor(private router: Router) {}
  onAdminClick() {
    this.router.navigate(["/login"]);
  }
}
