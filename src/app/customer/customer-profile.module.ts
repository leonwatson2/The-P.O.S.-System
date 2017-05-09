/*
*	customer.module.ts
*	Created by: Chris Beasley
*	CustomerProfileModule declares and exports all things related to 
*	customers in the application.
*/

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddCustomerComponent } from './add-customer.component';
import { EditCustomerComponent } from './edit-customer.component';
import { SearchCustomerComponent } from './search-customer.component';
import { CustomerFormComponent } from './customer.form.component';

import { PipesModule } from '../pipes/pipes.module';


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
		ReactiveFormsModule,
		PipesModule
	],
	exports:[
		AddCustomerComponent,
		EditCustomerComponent,
		SearchCustomerComponent
	]

})

export class CustomerProfileModule{

}
