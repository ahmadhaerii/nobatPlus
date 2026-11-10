import { Component, Input } from "@angular/core";

@Component({
  selector: "core-card",
  standalone: true,
  templateUrl: "./core-card.component.html",
  styleUrls: ["./core-card.component.scss"],
})
export class CoreCardComponent {
  @Input() cardClass = "bg-white";
}
