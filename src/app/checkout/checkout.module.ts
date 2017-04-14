import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { TransactionHistoryComponent } from './transaction-history.component';

import { DiscountCodeComponent } from './discount-code.component';


import { CheckOutComponent } from './checkout.component';
import { SearchPipe } from '../pipes/search.pipe';


@NgModule({
  declarations: [
    CheckOutComponent,
    SearchPipe,
    TransactionHistoryComponent,
    DiscountCodeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  exports:[
    CheckOutComponent,
    TransactionHistoryComponent
  ]

})
export class CheckOutModule { }
