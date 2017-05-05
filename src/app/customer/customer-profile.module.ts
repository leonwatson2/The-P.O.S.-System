import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddCustomerComponent } from './add-customer.component';
import { CustomerFormComponent } from './customer.form.component';

@NgModule({
	declarations:[
		AddCustomerComponent,
		CustomerFormComponent
	],
	imports:[
		BrowserModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule
	],
	exports:[
		AddCustomerComponent
	]

})

export class CustomerProfileModule{

}
