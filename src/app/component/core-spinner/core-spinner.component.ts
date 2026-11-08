import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { ColorState } from "src/app/utils/types";

@Component({
  selector: "core-spinner",
  templateUrl: "./core-spinner.component.html",
  styleUrls: ["./core-spinner.component.scss"],
  standalone: true,
  imports: [CommonModule],
})
export class CoreSpinnerComponent {
  @Input() size: number = 24;
  @Input() colorState: ColorState = "default";
  @Input() type: "circle" | "line" = "circle";
}
