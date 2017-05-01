import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product, iProduct } from '../classes';
import { ProductService, iProductResponse } from '../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddItemErrors } from '../errors';
import { productForm } from './product.form';

@Component({
	selector: 'edit-product',
	template:`
		<h2>Update Product</h2>
			<div>
			`+ productForm +`
	`
})

export class EditProductComponent { 
	productForm:FormGroup;
	products:Product[] = null;
	chosenProduct:Product = null;
	formType:String = "Update";
	errorTypes = AddItemErrors;
	error: AddItemErrors = null;
	
	constructor(private fb:FormBuilder, private productService: ProductService) {}
	
	setForm(product:Product){
		this.productForm = this.fb.group({
		'name':[null, Validators.compose([Validators.required])],
		'cost':[null, Validators.compose([Validators.required])],
		'amount':[null, Validators.compose([Validators.required])]
		});
	}
	
	setChosenProduct(product:Product){
		this.setForm(product);
		this.chosenProduct = product;
	}
	
	submitForm(values:iProduct){
		this.clearError();

		this.productService.updateProduct(this.chosenProduct, values)
			.subscribe((ProductRes:iProductResponse)=>{
				this.productForm.reset();
				
			}, (ProductResError)=>{
				this.setError(ProductResError.error);
			
		});
	}
	
	ngOnInit() {
		this.setForm(new Product(9));
		this.productService
			.getProducts()
			.subscribe((products:Product[])=>{
				this.products = products;
			})
	}

	setError(errorMes:AddItemErrors):void{
		this.error = errorMes;
	}

	clearError():void{
		this.error = null;
	}
	
}