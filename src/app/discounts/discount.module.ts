import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';

import { AddDiscountComponent } from './add-discount.component';
import { EditDiscountComponent } from './edit-discount.component';
import { SearchDiscountComponent } from './search-discount.component';


import { DiscountFormComponent } from './discount.form.component';


@NgModule({
	declarations:[
		AddDiscountComponent,
		DiscountFormComponent,
		EditDiscountComponent, 
		SearchDiscountComponent
	],
	imports:[
		CommonModule,
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		PipesModule
	],
	exports:[
		AddDiscountComponent,
		EditDiscountComponent, 
		SearchDiscountComponent
	]
})

export class DiscountModule{

}