import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './add-product.component';
import { EditProductComponent } from './edit-product.component';
import { SearchProductComponent } from './search-product.component';
import { ProductFormComponent } from './product.form.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
	declarations:[
		AddProductComponent,
		SearchProductComponent,
		EditProductComponent,
		ProductFormComponent		
	],
	imports:[
		FormsModule,
		BrowserModule,
		ReactiveFormsModule,
		CommonModule,
		PipesModule
	],

	exports:[
		AddProductComponent,
		SearchProductComponent,
		EditProductComponent
	]
})

export class ProductModule{

}