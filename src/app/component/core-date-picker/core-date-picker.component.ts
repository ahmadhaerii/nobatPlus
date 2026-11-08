import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'core-date-picker',
  templateUrl: './core-date-picker.component.html',
  styleUrls: ['./core-date-picker.component.scss'],
})
export class CoreDatePickerComponent implements OnInit {
  @Input() canSelectToday: boolean = false;
  @Input() defaultDate: string = '';
  @Input() label: string = '';
  @Input() inputFormControl: FormControl = new FormControl('', []);

  niraDatePickerForm: FormGroup = {} as FormGroup;
  isOpenCalendar: boolean = false;
  date: string = '';
  constructor(private changeDetectorRef: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.niraDatePickerForm = new FormGroup({
      niraDatePickerFormCtrl: this.inputFormControl,
    });
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  onDatePickerResult(result: string) {
    this.niraDatePickerForm.setValue({
      niraDatePickerFormCtrl: result,
    });
    this.date = result;
  }
  onTodayDate(todayDate: string) {
    this.date = todayDate;
    this.niraDatePickerForm.setValue({
      niraDatePickerFormCtrl: todayDate,
    });
  }
}
