import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'jalali-moment';
type Format = 'HH:mm' | 'jYYYY-jMM-jDD' | 'jYYYY-jMM-jDD HH:mm';
@Pipe({
  name: 'supervisor',
})
export class SupervisorPipe implements PipeTransform {
  transform(value: string): string {
    if (!(value === 'سرپرست' || value === 'ناشناس')) {
      return value + ' سرپرست ';
    }
    return value;
  }
}
