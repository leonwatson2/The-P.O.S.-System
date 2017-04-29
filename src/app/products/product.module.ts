import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ProductsComponent } from './products.component';

import { AddProductComponent } from './add-product.component';
import { EditProductComponent } from './edit-product.component';
import { SearchProductComponent } from './search-product.component';

@NgModule({
	declarations:[
		AddProductComponent,
		EditProductComponent,
		SearchProductComponent,
		ProductsComponent
	],
	imports:[
		BrowserModule,
		FormsModule,
		RouterModule
	],
	exports:[
		AddProductComponent,
		EditProductComponent,
		SearchProductComponent,
		ProductsComponent
	]

})

export class ProductModule{}