# BorderPass / Free Zone Plus (Angular 16.1)

ساختار پروژه مطابق BorderPassenger است: کامپوننت‌ها **standalone نیستند** و همه در `AppModule` (و آرایه‌های `core.module.ts` و `icons.module.ts`) declare می‌شوند.

```bash
npm install
npm start          # http://localhost:4200
```

## ساختار

```
src/
├── main.ts                         platformBrowserDynamic().bootstrapModule(AppModule)
├── styles.scss, index.html, assets/
└── app/
    ├── app.module.ts               declarations / imports اصلی
    ├── app-routing.module.ts       تعریف مسیرها (RouterModule.forRoot)
    ├── app.component.{ts,html,scss}
    ├── core.module.ts              declarationCores  (کامپوننت‌های core-*)
    ├── icons.module.ts             declarationIcons  (آیکون‌های svg)
    ├── api/                        سرویس‌های ارتباط با API  (*-api.service.ts)
    │   ├── login-api.service.ts
    │   ├── service-type-api.service.ts
    │   └── slot-api.service.ts
    ├── components/
    │   ├── core/                   core-btn، core-input، core-table ... (قابل استفاده‌ی مجدد)
    │   ├── public/                 home، slots، header، footer، login-modal، appointment-booking-modal
    │   └── admin/                  login، dashboard/*
    ├── guards/user-auth.guard.ts
    ├── services/                   http-request، label-manager، auth، appointment-booking
    ├── store/dataModels/           مدل‌های json2typescript
    ├── svg-icons/
    └── utils/                      api.config.ts، links.ts، validators.ts، util.ts، types.ts، pipes/ ...
```

## تنظیمات

- `src/app/utils/api.config.ts` → `useMock` و `baseUrl` را برای اتصال به API تنظیم کنید (کد OTP آزمایشی: 12345).
- لینک‌های فوتر: `src/app/components/public/footer/footer.component.html`
- لوگوی واقعی را جایگزین `src/assets/images/logo.svg` کنید.

## نکته‌ها

- کامپوننت‌های `core-date-picker`، `core-hour-number` و `core-table*` و همچنین پوشه‌ی `components/admin/dashboard` در پروژه هستند ولی هنوز در ماژول declare نشده‌اند
  (وابستگی‌هایی مثل nira-modal، ngx-indexed-db، دیالوگ‌های ادمین و `PermissionsService` هنوز اضافه نشده). هر وقت آماده شدند، به `core.module.ts` / `app.module.ts` و `app-routing.module.ts` اضافه کنید.
- ساخت کامپوننت جدید: `ng g c components/public/نام` (در Angular 16 به‌صورت پیش‌فرض non-standalone ساخته می‌شود) و بعد اضافه‌کردن به `declarations`.
