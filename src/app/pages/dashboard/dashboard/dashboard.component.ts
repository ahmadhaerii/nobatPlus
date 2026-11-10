import { Component } from "@angular/core";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent {
  isSelectMenu = false;
  get isRunningOnSmallScreen() {
    return Util.isRunningOnSmallScreen();
  }
  ngOnInit() {
    if (this.isRunningOnSmallScreen) {
      this.onMenuSelect();
    }
  }
  onMenuSelect() {
    this.isSelectMenu = !this.isSelectMenu;
  }
}
