import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HttpRequestService } from 'src/app/services/http-request.service';

@Component({
  selector: 'app-payment-gateway-redirector',
  templateUrl: './payment-gateway-redirector.component.html',
  styleUrls: ['./payment-gateway-redirector.component.scss'],
})
export class PaymentGatewayRedirectorComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('paymentForm') paymentForm!: ElementRef<HTMLFormElement>;

  redirectURL: string = '';
  token: string = '';

  constructor(private httpRequestService: HttpRequestService) {}
  ngOnInit(): void {
    this.token = localStorage.getItem('tokenForPayment')!;
    this.redirectURL = localStorage.getItem('paymentGatewayUrl')!;
  }

  ngAfterViewInit(): void {
    this.paymentForm.nativeElement.submit();
  }

  ngOnDestroy(): void {
    localStorage.removeItem('tokenForPayment');
    localStorage.removeItem('paymentGatewayUrl');
  }
}
