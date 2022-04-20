import { Component, OnInit } from '@angular/core';
import { Session } from './_models/session';
import { AccountService } from './_services/account.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'E-Recruitment';
  users: any;
  loader: boolean;

  constructor(private accountService: AccountService, private primeConfig: PrimeNGConfig) {}

  ngOnInit()
  {
    this.setCurrentUser();
    
    this.primeConfig.ripple = true;
  }

  setCurrentUser() {
    const session: Session = JSON.parse(localStorage.getItem('session'));
    this.accountService.setCurrentUser(session);
  }
}
