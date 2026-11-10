import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MenuItem } from 'src/app/utils/types';

@Component({
  selector: 'core-select',
  templateUrl: './core-select.component.html',
  styleUrls: ['./core-select.component.scss'],
})
export class CoreSelectComponent<T> {
  selectedItem: MenuItem<T> = {} as MenuItem<T>;
  newItems: MenuItem<T>[] = [];
  isOpenMenu = false;
  _items: any = [];
  _defaultValue = undefined;
  _titleKey!: T;
  _valueKey!: T;
  initCounter = 0;
  hasTitleKey = false;
  hasValueKey = false;
  hasItems = false;
  hasDefaultValue = false;
  @Input() set titleKey(data: T) {
    this._titleKey = data;
    this.hasTitleKey = true;
    this.init();
  }
  @Input() set valueKey(data: T) {
    this._valueKey = data;
    this.hasValueKey = true;
    this.init();
  }
  @Input() set items(data: any) {
    this._items = data;
    this.hasItems = true;
    this.init();
  }
  @Input({ required: true }) set defaultValue(data: any) {
    this._defaultValue = data;
    this.hasDefaultValue = true;
    this.init();
  }
  @Input() label: string = '';
  @Output() onItemSelected = new EventEmitter<any>();
  @Input() inputFormControl: FormControl = new FormControl('', []);

  constructor(private cdr: ChangeDetectorRef) {}
  init() {
    if (
      this.hasTitleKey &&
      this.hasValueKey &&
      this.hasItems &&
      this.hasDefaultValue
    ) {
      this.newItems = this.changeItemsType(this._items);
      const item = this.newItems.find(
        (item) => item.value == this._defaultValue
      );
      if (!this._defaultValue || this._defaultValue === null) return;
      this.inputFormControl.setValue(this._defaultValue);
      this.onItemSelect(
        this.newItems.find((item) => item.value == this._defaultValue)!,
        false
      );
    }
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  changeItemsType(items: any[]): MenuItem<T>[] {
    return items.map((item) => {
      return {
        title: item[this._titleKey],
        value: item[this._valueKey],
      };
    });
  }

  openMenuClick() {
    this.isOpenMenu = !this.isOpenMenu;
  }

  onItemSelect(selectedItem: MenuItem<T>, isFromUi: boolean): void {
    if (isFromUi) this.inputFormControl.markAsTouched();
    this.isOpenMenu = false;
    this.selectedItem = selectedItem;
    const mainItem = this._items.find(
      (item: any) => item[this._valueKey] === selectedItem.value
    );
    this.inputFormControl.setValue(selectedItem.value);
    this.onItemSelected.emit(mainItem);
  }
  focusOut() {
    this.isOpenMenu = false;
    this.inputFormControl.markAsTouched();
  }
}
