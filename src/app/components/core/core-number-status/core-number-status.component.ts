import { Component, Input } from '@angular/core';

@Component({
  selector: 'core-number-status',
  templateUrl: './core-number-status.component.html',
  styleUrls: ['./core-number-status.component.scss'],
})
export class CoreNumberStatusComponent {
  @Input() color: 'red' | 'blue' | 'green' | 'purple'= 'blue';
  @Input() number: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
}
