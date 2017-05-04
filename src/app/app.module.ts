/*
*  app.module.ts
*  AppModule is the main module for the application.
*  Imports all necessary Modules needed to run the application.
*/

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { appRoutes } from './routes';


/* Custom Modules */
import { LoginModule } from './login/login.module';
import { CheckOutModule } from './checkout/checkout.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ProductModule } from './products/product.module';
import { DiscountModule } from './discounts/discount.module';


/* Services */
import { EmployeeService } from './services/employee.service';
import { ProductService } from './services/product.service';


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
    ProductModule,
    DiscountModule,
	  RouterModule.forRoot(appRoutes)
  ],
  providers: [
  EmployeeService,
  ProductService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
