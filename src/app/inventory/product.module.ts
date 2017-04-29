import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AddProductComponent } from './add-product.component';
import { EditProductComponent } from './edit-product.component';
import { SearchProductComponent } from './search-product.component';

@NgModule({
	declarations:[
		AddProductComponent,
		EditProductComponent,
		SearchProductComponent
	],
	imports:[
		BrowserModule,
		FormsModule
	],
	exports:[
		AddProductComponent,
		EditProductComponent,
		SearchProductComponent
	]

})

export class ProductModule{}