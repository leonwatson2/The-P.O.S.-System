import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AdminDashboardComponent } from './admin-dashboard.component';
import { AssociateDashboardComponent } from './associate-dashboard.component';



@NgModule({
  declarations: [
     AdminDashboardComponent,
     AssociateDashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  exports:[
    AdminDashboardComponent,
    AssociateDashboardComponent
  ]
})
export class DashboardModule { }
