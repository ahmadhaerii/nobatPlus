/**
 * useMock = true  → سرویس‌ها داده‌ی آزمایشی برمی‌گردانند (کد OTP آزمایشی: 12345)
 * useMock = false → درخواست‌ها به baseUrl ارسال می‌شود
 */
export const API = {
  baseUrl: "http://turn.borderpark.ir/api",
  useMock: false,
  mockOtp: "12345",
};
