import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
//import { RouterModule } from '@angular/router';

import { AddProductComponent } from './add-product.component';
import { EditProductComponent } from './edit-product.component';
import { SearchProductComponent } from './search-product.component';
import { ProductsComponent } from './products.component';


import { PipesModule } from '../pipes/pipes.module';

@NgModule({
	declarations:[
		AddProductComponent,
		SearchProductComponent,
		EditProductComponent,
		//ProductsComponent		
	],
	imports:[
		FormsModule,
		BrowserModule,
		ReactiveFormsModule,
		CommonModule,
		PipesModule,
		//RouterModule
	],

	exports:[
		AddProductComponent,
		SearchProductComponent,
		EditProductComponent,
		//ProductsComponent
	]
})

export class ProductModule{

}