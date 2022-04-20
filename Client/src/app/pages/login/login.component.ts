import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Session } from 'src/app/_models/session';
import { AccountService } from '../../_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {}

  constructor(public accountService: AccountService, public router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe(response => {
      if(response)
        this.router.navigateByUrl('/home');
    })
  }

  login() {
    this.accountService.login(this.model).subscribe(() => {
      this.router.navigateByUrl('/home');
    })
  }

  logout(){
    this.accountService.logout();
  }
}
