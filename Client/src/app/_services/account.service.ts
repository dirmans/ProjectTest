import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Session } from '../_models/session';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<Session>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private jwtService: JwtHelperService) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((session: any) => {
        if (session) {
          localStorage.setItem('session', JSON.stringify(session));
          this.currentUserSource.next(session);
        }
      })
    )
  }

  setCurrentUser(session: Session) {
    this.currentUserSource.next(session);
  }

  logout() {
    localStorage.removeItem('session');
    this.currentUserSource.next(null);
  }
}
