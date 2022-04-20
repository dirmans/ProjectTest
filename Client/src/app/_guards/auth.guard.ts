import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  jwtHelper = new JwtHelperService();

  constructor(private accountService: AccountService, private toastr: ToastrService, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map(response => {
        if (response) {
          const isExpired = this.jwtHelper.isTokenExpired(response.token);

          if (isExpired) {
            this.toastr.error("Your session has been expired. Please login again.");
            localStorage.removeItem('session');
            this.router.navigateByUrl("/");

            return false;
          }

          return true;
        } else {
          this.toastr.error("You don't have permission. Must login first.");
          this.router.navigateByUrl("/");
          return false;
        }
      })
    )
  }

}
