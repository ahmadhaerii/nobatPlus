import { Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'bp-header',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private router = inject(Router);
  auth = inject(AuthService);

  isSlotsPage$ = this.router.events.pipe(
    filter((e) => e instanceof NavigationEnd),
    startWith(null),
    map(() => this.router.url.startsWith('/slots')),
  );

  goHome(): void { this.router.navigate(['/']); }
  login(): void { this.auth.openLogin(); }
  logout(): void { this.auth.logout(); this.router.navigate(['/']); }
}
