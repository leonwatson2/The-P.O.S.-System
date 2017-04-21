import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';

import { LoginModule } from './login/login.module';
import { CheckOutModule } from './checkout/checkout.module';
import { DashboardModule } from './dashboard/dashboard.module';

import { EmployeeModule } from './employee/employee.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    LoginModule,
    CheckOutModule,
    BrowserAnimationsModule,
    DashboardModule,
    EmployeeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
