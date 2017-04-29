/*
*  dashboard.module.ts
*  Dashboard Module holds all the declarations 
*  for the dashboards in the Application.
*    
*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ManagerDashboardComponent } from './manager-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AssociateDashboardComponent } from './associate-dashboard.component';

import { ProductModule } from '../products/product.module';


@NgModule({
  declarations: [
     AdminDashboardComponent,
     AssociateDashboardComponent,
     ManagerDashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ProductModule,
    RouterModule
  ],
  exports:[
    AdminDashboardComponent,
    AssociateDashboardComponent,

    ManagerDashboardComponent
  ]
})
export class DashboardModule { }
