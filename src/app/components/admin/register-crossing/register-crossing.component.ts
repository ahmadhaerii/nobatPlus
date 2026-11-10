import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LabelManagerService } from 'src/app/services/label-manager.service';
import {
  IRegisterCrossing,
  RegisterCrossingLabels,
} from './register-crossing.label';
import { NiraSnackBarService } from 'nira-snack-bar';
import { CapacityCS } from 'src/app/store/componentStore/capacityCS';

@Component({
  selector: 'app-register-crossing',
  templateUrl: './register-crossing.component.html',
  styleUrls: ['./register-crossing.component.scss'],
})
export class RegisterCrossingComponent {
  loading: boolean = false;
  newCapacityList: any[] = [];
  capacityList: any[] = [];
  hoursList: any[] = [
    { label: '00', number: 0 },
    { label: '01', number: 0 },
    { label: '02', number: 0 },
    { label: '03', number: 0 },
    { label: '04', number: 0 },
    { label: '05', number: 0 },
    { label: '06', number: 0 },
    { label: '07', number: 0 },
    { label: '08', number: 0 },
    { label: '09', number: 0 },
    { label: '10', number: 0 },
    { label: '11', number: 0 },
    { label: '12', number: 0 },
    { label: '13', number: 0 },
    { label: '14', number: 0 },
    { label: '15', number: 0 },
    { label: '16', number: 0 },
    { label: '17', number: 0 },
    { label: '18', number: 0 },
    { label: '19', number: 0 },
    { label: '20', number: 0 },
    { label: '21', number: 0 },
    { label: '22', number: 0 },
    { label: '23', number: 0 },
  ];
  labels = this.labelManagerService.getLabels<IRegisterCrossing>(
    RegisterCrossingLabels
  );

  myForm: FormGroup = new FormGroup({
    formControlFromDate: new FormControl('', Validators.required),
    formControlToDate: new FormControl('', Validators.required),
  });
  constructor(private labelManagerService: LabelManagerService,
    private capacityCS: CapacityCS,
    private niraSnackBarService: NiraSnackBarService,
  ) {}

  ngOnInit() {
    this.capacityList = [...this.hoursList]

  }

  changeCapacity(event: any) {
    this.newCapacityList = this.capacityList.map((hour) => {
      if (hour.label === event.hour) hour.number = event.capacity;
      return hour;
    });
  }

  async add() {
    this.loading = true;
    const hours: number[] = this.newCapacityList.map((hour) => hour.number);    try {
      await this.capacityCS.addRole(
        this.myForm.controls['formControlFromDate'].value,
        this.myForm.controls['formControlToDate'].value,
        hours
      );
      this.niraSnackBarService.show('تغییرات با موفقیت اعمال شد', {
        duration: 3000,
        horizontalPosition: 'bottom',
        verticalPosition: 'center',
        statusClass: 'success',
      });
    } catch (error) {
      console.error(error);
    }
    this.loading = false;
  }
}
