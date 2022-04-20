import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';
import { BusyService } from 'src/app/_services/busy.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}
  el: any;

  constructor(public accountService: AccountService, @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2) { }

  ngOnInit(): void {
    const myClassess = 'sidebar-slide-open layout-fixed';
    myClassess.split(' ').forEach((className: string) => {
      this.renderer.addClass(this.document.body, className);
    });
  }

  logout() {
    this.accountService.logout();
  }

  ngOnDestroy(): void {
    const myClassess = 'sidebar-slide-open layout-fixed';
    myClassess.split(' ').forEach((className: string) => {
      this.renderer.removeClass(this.document.body, className);
    });
  }
}
