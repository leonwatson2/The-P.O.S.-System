import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AddCustomerComponent} from './add-customer.component';

@NgModule({
	declarations:[
		AddCustomerComponent
	],
	imports:[
		BrowserModule,
		CommonModule
	],
	exports:[
		AddCustomerComponent
	]

})

export class CustomerProfileModule{

}