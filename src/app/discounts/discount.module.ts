import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddDiscountComponent } from './add-discount.component';
import { EditDiscountComponent } from './edit-discount.component';

import { DiscountFormComponent } from './discount.form.component';


@NgModule({
	declarations:[
		AddDiscountComponent,
		DiscountFormComponent,
		EditDiscountComponent
	],
	imports:[
		CommonModule,
		BrowserModule,
		FormsModule,
		ReactiveFormsModule
	],
	exports:[
		AddDiscountComponent,
		EditDiscountComponent
	]
})

export class DiscountModule{

}