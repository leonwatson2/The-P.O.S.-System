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
import { CustomerProfileModule } from './customer/customer-profile.module';

/* Services */
import { EmployeeService } from './services/employee.service';
import { ProductService } from './services/product.service';
import { DiscountService } from './services/discount.service';
import { CustomerService } from './services/customer.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { ManagerAuthGuardService } from './services/manager-auth-guard.service';
import { AssociateAuthGuardService } from './services/associate-auth-guard.service';

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
    CustomerProfileModule,
	  RouterModule.forRoot(appRoutes)
  ],
  providers: [
  EmployeeService,
  ProductService,
  DiscountService,
  CustomerService,
  AdminAuthGuardService,
  ManagerAuthGuardService,
  AssociateAuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
