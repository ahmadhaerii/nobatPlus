import { AbstractControl, ValidationErrors } from '@angular/forms';

/** تبدیل ارقام فارسی/عربی به انگلیسی */
export function toEnglishDigits(value: string): string {
  return (value ?? '')
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660));
}

export function mobileValidator(c: AbstractControl): ValidationErrors | null {
  return /^09\d{9}$/.test(toEnglishDigits(c.value ?? '')) ? null : { mobile: true };
}

export function nationalCodeValidator(c: AbstractControl): ValidationErrors | null {
  const code = toEnglishDigits(c.value ?? '');
  if (!/^\d{10}$/.test(code) || /^(\d)\1{9}$/.test(code)) return { nationalCode: true };
  const sum = code
    .slice(0, 9)
    .split('')
    .reduce((acc, d, i) => acc + Number(d) * (10 - i), 0);
  const r = sum % 11;
  const check = Number(code[9]);
  return (r < 2 ? check === r : check === 11 - r) ? null : { nationalCode: true };
}
