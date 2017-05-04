import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AddDiscountComponent } from './add-discount.component';


@NgModule({
	declarations:[
		AddDiscountComponent		
	],
	imports:[
		CommonModule,
		BrowserModule
	],
	exports:[
		AddDiscountComponent
	]
})

export class DiscountModule{

}