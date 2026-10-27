import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'bp-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private router = inject(Router);

  /** برای افزودن خدمات جدید، یک آیتم به این آرایه اضافه کنید */
  services = [{ id: 'plate-change', title: 'تعویض پلاک', route: '/slots' }];

  trackById = (_: number, s: { id: string }) => s.id;

  open(route: string): void { this.router.navigate([route]); }
}
