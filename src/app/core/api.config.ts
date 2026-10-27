/**
 * useMock = true  → سرویس‌ها داده‌ی آزمایشی برمی‌گردانند (کد OTP آزمایشی: 12345)
 * useMock = false → درخواست‌ها به baseUrl ارسال می‌شود
 */
export const API = {
  baseUrl: '/api',
  useMock: true,
  mockOtp: '12345',
};
