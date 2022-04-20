import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { JwtModule } from "@auth0/angular-jwt";

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './_modules/shared.module';
import { NavComponent } from './templates/nav/nav.component';
import { SidebarComponent } from './templates/sidebar/sidebar.component';
import { FooterComponent } from './templates/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { PromotionComponent } from './pages/promotion/promotion.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SidebarComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    PromotionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        //allowedDomains: ['localhost:4200', 'fsjktspdev01.fiberstar.local:4445', 'fsjktspdev01:4445'],
        //disallowedRoutes: ['localhost:4200/api', 'fsjktspdev01.fiberstar.local:4445/api', 'fsjktspdev01:2324/api'],
      },
    }),
    SharedModule,
    NgxSpinnerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
