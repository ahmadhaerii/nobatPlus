import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "persianTextDigits",
})
export class PersianTextDigitsPipe implements PipeTransform {
  transform(el: number | string): string {
    const persian: Record<number, string> = {
      0: "۰",
      1: "۱",
      2: "۲",
      3: "۳",
      4: "۴",
      5: "۵",
      6: "۶",
      7: "۷",
      8: "۸",
      9: "۹",
    } as const;

    if (el != undefined && el.toString().length) {
      let elements = el.toString();
      let list = elements.match(/[0-9]/g);
      if (list != null && list.length != 0) {
        for (let i = 0; i < list.length; i++) {
          elements = elements.replace(list[i], persian[Number(list[i])]);
        }
      }
      elements = elements.replace(/-/g, "/");
      return elements;
    } else return "";
  }
}
