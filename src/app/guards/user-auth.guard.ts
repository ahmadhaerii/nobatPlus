import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanActivateChild,
  Router,
  UrlTree,
} from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class UserAuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  canActivate(): boolean | UrlTree {
    return this.checkAccess;
  }

  canActivateChild(): boolean | UrlTree {
    return this.checkAccess;
  }

  private get checkAccess(): boolean | UrlTree {
    if (this.auth.isLoggedIn) {
      return true;
    }
    this.auth.openLogin();
    return this.router.createUrlTree(["/"]);
  }
}
