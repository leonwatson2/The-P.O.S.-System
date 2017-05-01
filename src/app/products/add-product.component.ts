import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product, iProduct } from '../classes';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddItemErrors } from ../errors';
import { productForm } from ./product.form';

@Component({
	selector: 'inventory',
	template:`
		<h2>Add Product</h2>
			<div>
			`+ productForm +`
	`
})

export class AddProductComponent { 
	productForm:FormGroup;
	formType:String = "Add";
	errorTypes: = AddItemErrors;
	error: AddItemErrors = null;
	
	constructor(fb:FormBuilder, private productService: ProductService) { this.productForm = fb.group({
		'name':[null, Validators.compose([Validators.required])],
		'cost':[null, Validators.compose([Validators.required])],
		'amount':[null, Validators.compose([Validators.required])]
		});
	}
	
	submitForm(values:iProduct){
		this.clearError();

		this.productService.addProduct(values)
			.subscribe((ProductRes:iProductResponse)=>{
				this.ProductForm.reset();
				
			}, (ProductResError)=>{
				this.setError(ProductResError.error);
			
		});
	}
	
	ngOnInit() {
		
	}

	addProduct(){
			
		}

}