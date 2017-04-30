/*
*	discount.module.ts
*	Created by: Leon Watson
*	DiscountModule declares and exports all things related to 
*	discounts in the application.
*/

import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AddDiscountComponent } from './add-discount.component';
import { EditDiscountComponent } from './edit-discount.component';
import { SearchDiscountComponent } from './search-discount.component';

import { PipesModule } from '../pipes/pipes.module';

@NgModule({
	declarations:[
		AddDiscountComponent,
		SearchDiscountComponent,
		EditDiscountComponent		
	],
	imports:[
		FormsModule,
		BrowserModule,
		ReactiveFormsModule,
		CommonModule,
		PipesModule
	],

	exports:[
		AddDiscountComponent,
		SearchDiscountComponent,
		EditDiscountComponent
	]
})

export class DiscountModule{

}