export interface ILoginLabel {
  titleHeader: string;
  user: string;
  password: string;
  submit: string;
  requiredError: string;
  rememberMe: string;
}

export const Labels: ILoginLabel = {
  titleHeader: "ورود مدیریت مرز",
  user: "نام کاربری ",
  password: "کلمه عبور",
  submit: "ورود",
  requiredError: "این فیلد اجباری است",
  rememberMe: "مرا بخاطر بسپار",
};
