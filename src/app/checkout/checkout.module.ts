import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PipesModule } from '../pipes/pipes.module';


import { TransactionHistoryComponent } from './transaction-history.component';

import { DiscountCodeComponent } from './discount-code.component';
import { LibraryComponent } from './library.component';


import { CheckOutComponent } from './checkout.component';


@NgModule({
  declarations: [
    CheckOutComponent,
    TransactionHistoryComponent,
    DiscountCodeComponent,
    LibraryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PipesModule,
    HttpModule,
  ],
  exports:[
    CheckOutComponent,
    TransactionHistoryComponent
  ]

})
export class CheckOutModule { }
