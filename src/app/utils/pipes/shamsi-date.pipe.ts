import { Pipe, PipeTransform } from "@angular/core";
import moment from "moment";

type Format = "HH:mm" | "jYYYY-jMM-jDD" | "jYYYY-jMM-jDD HH:mm";
@Pipe({
  name: "shamsiDate",
})
export class ShamsiDatePipe implements PipeTransform {
  transform(value: string, format: Format, ...args: unknown[]): string {
    const m = moment(value, "YYYY-MM-DD HH:mm");
    return m.format(format);
  }
}
