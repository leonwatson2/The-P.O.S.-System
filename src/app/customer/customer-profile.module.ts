import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AddCustomerComponent } from './add-customer.component';
import { CustomerFormComponent } from './customer.form.component';

@NgModule({
	declarations:[
		AddCustomerComponent,
		CustomerFormComponent
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
