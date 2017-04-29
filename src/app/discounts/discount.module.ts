/*
*	discount.module.ts
*	Created by: Leon Watson
*	DiscountModule declares and exports all things related to 
*	discounts in the application.
*/

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AddDiscountComponent } from './add-discount.component';
import { EditDiscountComponent } from './edit-discount.component';
import { SearchDiscountComponent } from './display-discount.component';

@NgModule({
	declarations:[
		AddDiscountComponent,
		SearchDiscountComponent,
		EditDiscountComponent		
	],
	imports:[
		FormsModule,
		BrowserModule
	],

	exports:[
		AddDiscountComponent,
		SearchDiscountComponent,
		EditDiscountComponent
	]
})

export class DiscountModule{

}