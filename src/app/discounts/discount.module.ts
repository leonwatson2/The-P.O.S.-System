import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddDiscountComponent } from './add-discount.component';
import { DiscountFormComponent } from './discount.form.component';


@NgModule({
	declarations:[
		AddDiscountComponent,
		DiscountFormComponent
	],
	imports:[
		CommonModule,
		BrowserModule,
		FormsModule,
		ReactiveFormsModule
	],
	exports:[
		AddDiscountComponent
	]
})

export class DiscountModule{

}