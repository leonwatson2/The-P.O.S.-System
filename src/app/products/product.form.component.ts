import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService, iProductResponse } from '../services/product.service';
import { eAppErrors, eFormType } from '../enums';
import { Product, iProduct } from '../classes';

@Component({
	selector: 'product-form',
	template:
	`
		<form [formGroup]="productForm" (ngSubmit)="submitForm(productForm.value)">
			<label for="prodName">Product Name</label>
			<input type="text"
				(focus)="productForm.controls['name'].setValue('')"
				id="prodName"
				placeholder="Product Name"
				[formControl]="productForm.controls['name']"/>
			<label for="prodCost">Product Cost</label>
			<input type="number"
				(focus)="productForm.controls['cost'].setValue('')"
				id="prodCost"
				placeholder="Product Cost"
				[formControl]="productForm.controls['cost']"/>
			<label for="prodAmount">Product Amount</label>
			<input type="number"
				(focus)="productForm.controls['amount'].setValue('')"
				id="prodAmount"
				placeholder="Product Amount"
				[formControl]="productForm.controls['amount']"/>
			<button type="submit">
				<span>{{ typeForm == eFormType.ADD ? "Add":"Update" }}</span> Product
			</button>
			<button type="button" (click)="deleteProduct()" *ngIf="typeForm == eFormType.EDIT">Delete
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
		</form>
		`,
		styleUrls:['../styles/style.css']
})

export class ProductFormComponent{
	@Input('type') typeForm:eFormType;
	@Input() chosenProduct:Product = null;
	@Output() updated = new EventEmitter();
	eFormType = eFormType;
	productForm: FormGroup;
	products:Product[] = [];
	error: eAppErrors = null;
	eAppErrors = eAppErrors;
		
	constructor(private fb:FormBuilder, private productService:ProductService){}
		
	ngOnInit(){
		this.initForm();
	}
		
	initForm(product:Product = null){
		if(this.typeForm == eFormType.ADD){
			this.productForm = this.fb.group({
			'name':[null, Validators.compose([Validators.required])],
			'cost':[null, Validators.compose([Validators.required])],
			'amount':[null, Validators.compose([Validators.required])]
			});
		}
		else if(this.typeForm == eFormType.EDIT){
			this.productForm = this.fb.group({
			'name':[this.chosenProduct.name, Validators.compose([Validators.required])],
			'cost':[this.chosenProduct.cost, Validators.compose([Validators.required])],
			'amount':[this.chosenProduct.amount, Validators.compose([Validators.required])]
			});
		}
	}
	
	submitForm(values:iProduct){
		this.clearError();
		if(this.typeForm == eFormType.ADD){
			this.addProduct(values);
		}
		else if(this.typeForm == eFormType.EDIT){
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
	
	setChosenProduct(product:Product){
		this.chosenProduct = product;
		this.initForm(product);
	}
	
	createProduct(product:iProduct):Product{
		return new Product(
			Math.floor(Math.random()*10000000000),
			product.name,
			product.cost,
			product.amount
		);
	}
	
	isProduct(product:iProduct):Boolean{
		let bool = this.products.findIndex((p)=>{
			return p.name == product.name
		})
		return bool >= 0;
	}
	
	setError(num:eAppErrors){
		this.error = num;
	}
	
	clearError():void{
		this.error = null;
	}
	
	deleteProduct(){
		this.updated.emit({});
		this.productService.deleteProduct(this.chosenProduct);
	}
}