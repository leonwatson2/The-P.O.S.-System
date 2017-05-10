import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService, iProductResponse } from '../services/product.service';
import { eAppErrors, eFormType } from '../enums';
import { Product, iProduct } from '../classes';

@Component({
	selector: 'product-form',
	template:
	`
		<form [formGroup]="productForm" class="product-form" (ngSubmit)="submitForm(productForm.value)">
			<input type="text"
				(focus)="productForm.controls['name'].setValue('')"
				placeholder="Product Name"
				[ngClass]="{'has-error':!productForm.controls['name'].valid && productForm.controls['name'].touched}"
				[formControl]="productForm.controls['name']"/>
			<input type="number"
				(focus)="productForm.controls['cost'].setValue('')"
				placeholder="Product Cost"
				min=.01	[ngClass]="{'has-error':!productForm.controls['value'].valid && productForm.controls['value'].touched}"
				[formControl]="productForm.controls['value']"/>
			<input type="number"
				(focus)="productForm.controls['amount'].setValue('')"
				placeholder="Product Amount"
				min=0	[ngClass]="{'has-error':!productForm.controls['value'].valid && productForm.controls['value'].touched}"
				[formControl]="productForm.controls['value']"/>
			<button type="submit" class="btn btn-success" [disabled]="!discountForm.valid">
				<span>{{ type == eFormType.ADD ? "Add":"Updates" }}</span> Product
			</button>
				
			<div [ngSwitch]="error">
				<div
					*ngSwitchCase="eAppErrors.DUPLICATE">
					Product already exists
				</div>
				<div
					*ngSwitchCase="eAppErrors.INVALID">
					Product Cost 
					<span *ngIf="!productForm.controls['cost'].value"> must be positive. </span>
					<span *ngIf="productForm.controls['cost'].value">must be greater than 0. </span>
				</div>
			</div>
		</form>`
})

export class ProductFormComponent{
	@Input() type:eFormType;
	@Input() chosenProduct:Product;
	@Output() updated = new EventEmitter();
	eAppErrors:typeof eAppErrors = eAppErrors;
	eFormType:typeof eFormType = eFormType;
		
	productForm: FormGroup;
	error: eAppErrors;
		
	constructor(private fb:FormBuilder, private productService:ProductService){}
		
	ngOnInit(){
	}
		
	ngOnChanges(){
		this.initForm();
	}
		
	initForm(){
		if(this.type == eFormType.ADD){
			this.productForm = this.fb.group({
			'name':[null, Validators.compose([Validators.required])],
			'cost':[null, Validators.compose([Validators.required])],
			'amount':[null, Validators.compose([Validators.required])]
			});
		}
		else if(this.type == eFormType.EDIT){
			this.productForm = this.fb.group({
			'name':[this.chosenProduct.name, Validators.compose([Validators.required])],
			'cost':[this.chosenProduct.cost, Validators.compose([Validators.required])],
			'amount':[this.chosenProduct.amount, Validators.compose([Validators.required])]
			});
		}
	}
	
	submitForm(values:iProduct){
		this.clearError();
		if(this.type == eFormType.ADD){
			this.addProduct(values);
		}
		else if(this.type == eFormType.EDIT){
			this.updateProduct(this.chosenProduct, values);
		}
	}
	
	addProduct(product:iProduct){
		this.productService.addProduct(product)
			.subscribe((response:iProductResponse)=>{
			console.log(response.product);
			this.productForm.reset();
			}, (response:iProductResponse)=>{
			this.setError(response.error);
			});
	}
	
	updateProduct(oldProduct:Product, newProduct:iProduct){
		this.productService.updateProduct(oldProduct, newProduct)
			.subscribe((response:iProductResponse)=>{
			this.updated.emit({});
			this.clearError();
			this.productForm.reset();
			},(response:iProductResponse)=>{
			this.setError(response.error);
			})
	}
	
	setError(errorMes:eAppErrors):void{
		this.error = errorMes;
	}
	
	clearError():void{
		this.error = null;
	}
}