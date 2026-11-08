import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  ButtonSize,
  ButtonType,
  ColorState,
  ConfirmDialog,
  ThemePalette,
} from "src/app/utils/types";
import { CoreSpinnerComponent } from "../core-spinner/core-spinner.component";

@Component({
  selector: "core-btn",
  templateUrl: "./core-btn.component.html",
  styleUrls: ["./core-btn.component.scss"],
  standalone: true,
  imports: [CommonModule, CoreSpinnerComponent],
})
export class CoreBtnComponent {
  disable = false;

  @Input() loading: boolean = false;
  @Input() theme: ThemePalette = "square";
  @Input() buttonType: ButtonType = "button";
  @Input() size: ButtonSize = "small";
  @Input() set isDisabled(value: boolean) {
    this.disable = value;
  }
  @Input() colorState: ColorState = "default";
  @Output() btnClicked: EventEmitter<any> = new EventEmitter();
  @Input() confirmDialog: ConfirmDialog | undefined;
  clicked() {
    if (!this.disable && !this.loading) {
    }
  }
}
