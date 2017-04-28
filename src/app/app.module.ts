import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AssociateDashboardComponent } from './dashboard/associate-dashboard.component';
import { ManagerDashboardComponent } from './dashboard/manager-dashboard.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard.component';
import { CheckOutComponent } from './checkout/checkout.component';
import { DiscountCodeComponent } from './checkout/discount-code.component';
import { TransactionHistoryComponent } from './checkout/transaction-history.component';

import { LoginModule } from './login/login.module';
import { CheckOutModule } from './checkout/checkout.module';

import { DashboardModule } from './dashboard/dashboard.module';
import { EmployeeService } from './services/employee.service';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
	{ path: '', component: LoginComponent },
	{ path: 'associate', component: AssociateDashboardComponent },
	{ path: 'manager', component: ManagerDashboardComponent },
	{ path: 'admin', component: AdminDashboardComponent },
	{ path: 'checkout', component: CheckOutComponent },
	{ path: 'transaction-history', component: TransactionHistoryComponent },
	{path: 'discount-code', component: DiscountCodeComponent }
];

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
	RouterModule.forRoot(appRoutes)
  ],
  providers: [
  EmployeeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
