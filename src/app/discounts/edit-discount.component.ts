import { Component } from '@angular/core';
import { Discount, iDiscount } from '../classes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService, iDiscountResponse } from '../services/product.service';
import { AddItemErrors } from '../errors';
import { discountForm } from './discount.form';


@Component({
	selector: 'edit-discount',
	template: `
			<h2>Edit Discount</h2>
			<div class="list-group">
				<div class="list-group-item search">
					<input type="search" placeholder="Search an Item" [(ngModel)]="search" />
				</div>
				<span *ngIf="discounts">
					<a class="list-group-item" (click)="setChosenDiscount(discount);" *ngFor="let discount of discounts | find:{key:'name', value:search}">
						{{discount.name}} - 
						<span *ngIf="!discount.isPercentage()">$</span>
						{{discount.value}} 
						<span *ngIf="discount.isPercentage()">%</span> 
						off
					</a>
				</span>
			</div>
			<div *ngIf="chosenDiscount">
			`+discountForm+`
			</div>
			
			`,
			styleUrls:['./discounts.css','../solar-bootstrap-theme.min.css']
})

export class EditDiscountComponent {
	discountForm:FormGroup;
	discounts:Discount[] = null;
	chosenDiscount:Discount = null;
	search:String = "";
	formType:String = "Update"; 
	errorTypes = AddItemErrors;
	error:AddItemErrors = null;

	constructor(private fb:FormBuilder, private productService:ProductService){}

	ngOnInit(){
		this.setForm(new Discount(221));
		this.productService
			.getDiscounts()
			.subscribe((discounts:Discount[])=>{
				this.discounts = discounts;
			})

	}

	setForm(discount:Discount){
		this.discountForm = this.fb.group({
			'name':[discount.name, Validators.compose([Validators.required])],
			'value':[discount.value, Validators.compose([Validators.required])],
			'isPercentage':discount.isPercentage()
			});	
	}
	setChosenDiscount(discount:Discount){
		this.setForm(discount);
		this.chosenDiscount = discount;
	}

	submitForm(values:iDiscount){
		this.clearError();
		
		this.productService
			.updateDiscount(this.chosenDiscount, values)
			.subscribe((discountRes:iDiscountResponse)=>{
				this.discountForm.reset();
				this.chosenDiscount = null;
		
			}, (discountResError)=>{
				this.setError(discountResError.error);
			
		});
	}
	
	setError(errorMes:AddItemErrors):void{
		this.error = errorMes;
	}

	clearError():void{
		this.error = null;
	}


}
