import { CommonModule } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { PersianTextDigitsPipe } from "src/app/utils/pipes/persian-text-digits.pipe";
import { InputType } from "src/app/utils/types";
@Component({
  selector: "core-input",
  standalone: true,

  imports: [CommonModule, ReactiveFormsModule, PersianTextDigitsPipe],
  templateUrl: "./core-input.component.html",
  styleUrls: ["./core-input.component.scss"],
})
export class CoreInputComponent {
  inputType!: InputType;
  isDisable = false;

  @Input() set type(value: InputType) {
    this.inputType = value;
  }

  @Input() inputFormControl: FormControl = new FormControl("", []);
  @Input() containerBackground: string = "white";
  @Input() inputBackground: string = "rgba(242, 244, 247, 0.15)";
  @Input() inputFocusBackground: string = "rgba(242, 244, 247, 0.05)";
  @Input() inputFocusBorder: string = "1px solid rgba(19, 92, 175, 0.397)";
  @Input() inputHeight: string = "42px";
  @Input() inputRadius: string = "3px";
  @Input() inputBorder: string = "none";
  @Input() inputTextAlign: string = "start";
  @Input() labelTop: string = "12px";
  @Input() labelRight: string = "20px";
  @Input() labelLeft: string = "inherit";
  @Input() labelTransform: string = "none";
  @Input() labelDirection: string = "inherit";
  @Input() canShowPlaceHolder: boolean = true;

  @Input() set disable(value: boolean) {
    this.isDisable = value;
    if (value) {
      this.inputFormControl.disable();
    } else {
      this.inputFormControl.enable();
    }
  }
  @Input() placeholder = "";
  @Output() onChange: EventEmitter<string> = new EventEmitter();

  change() {
    if (!this.inputFormControl.errors) {
      this.onChange.emit(this.inputFormControl.value);
    }
  }
}
