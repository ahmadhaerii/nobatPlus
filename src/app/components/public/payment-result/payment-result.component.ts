import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { ChargeRuleApiService } from "src/app/api/chargeRule-api.service";
import { PaymentResultDM } from "src/app/store/dataModels/ChargeRuleDM";

@Component({
  selector: "app-payment-result",
  templateUrl: "./payment-result.component.html",
  styleUrls: ["./payment-result.component.scss"],
})
export class PaymentResultComponent implements OnInit {
  invoiceId: string | null = null;
  errorMessage: string | undefined = undefined;
  paymentResult: PaymentResultDM = {} as PaymentResultDM;
  loading: boolean = false;
  status:
    | "Success"
    | "failed"
    | "not_found"
    | "duplicate"
    | "verify_failed"
    | "Exception" = "Success";
  constructor(
    private route: ActivatedRoute,
    private chargeRuleApiService: ChargeRuleApiService,
    private router: Router,
  ) {}

  async ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.invoiceId = params.get("ID");
      const status: any = params.get("status");
      this.status = status;
    });
    await this.getPaymentResult();
  }

  async getPaymentResult() {
    switch (this.status) {
      case "Success":
        try {
          this.loading = true;
          const result: any = await this.chargeRuleApiService.getPaymentResult(
            this.invoiceId!,
          );
          this.paymentResult = result;
          this.loading = false;
        } catch (error) {
          console.error(error);
          this.loading = false;
        }
        break;
      case "failed":
        this.errorMessage = "تراکنش ناموفق بود یا توسط کاربر لغو شد";
        break;
      case "not_found":
        this.errorMessage = "فاکتور مربوطه در سامانه یافت نشد";
        break;
      case "duplicate":
        this.errorMessage = "این تراکنش قبلاً ثبت و تایید شده است";
        break;
      case "verify_failed":
        this.errorMessage = "تاییدیه پرداخت از سوی بانک صادر نشد";
        break;
      case "Exception":
        this.errorMessage =
          "خطای سرور در پردازش پرداخت لطفا مجدد امتحان فرمایید";
        break;
    }
  }

  goToHome() {
    this.router.navigate([""]);
  }
}
