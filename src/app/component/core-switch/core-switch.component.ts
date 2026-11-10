import { Component, EventEmitter, Input, Output } from '@angular/core';
interface ISwitch {
  iconActive: string;
  iconInactive: string;
}
@Component({
  selector: 'core-switch',
  templateUrl: './core-switch.component.html',
  styleUrls: ['./core-switch.component.scss'],
})
export class CoreSwitchComponent {
  toggle!: string;

  @Output() value = new EventEmitter<string>();
  @Input() icon!: ISwitch;
  @Input() label = '';
  @Input() set defaultValue(value: string) {
    this.toggle = value;
  }

  change() {
    if (this.toggle === this.icon.iconActive)
      this.toggle = this.icon.iconInactive;
    else this.toggle = this.icon.iconActive;

    this.value.emit(this.toggle);
  }
}
