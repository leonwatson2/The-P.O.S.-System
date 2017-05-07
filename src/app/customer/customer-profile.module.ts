import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddCustomerComponent } from './add-customer.component';
import { EditCustomerComponent } from './edit-customer.component';
import { SearchCustomerComponent } from './search-customer.component';

import { CustomerFormComponent } from './customer.form.component';


@NgModule({
	declarations:[
		AddCustomerComponent,
		CustomerFormComponent,
		EditCustomerComponent,
		SearchCustomerComponent
	],
	imports:[
		BrowserModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule
	],
	exports:[
		AddCustomerComponent,
		EditCustomerComponent,
		SearchCustomerComponent
	]

})

export class CustomerProfileModule{

}
