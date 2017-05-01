import { Component } from '@angular/core';
import { Discount, iDiscount } from '../classes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { ProductService, iDiscountResponse } from '../services/product.service';
import { AddItemErrors } from '../errors';
import { discountForm } from './discount.form';

@Component({
	selector: 'add-discount',
	template: `
			<h2>Add Discount</h2>
			<div>
			`+ discountForm +`
			
				<div *ngIf="discountForm.valid && discountForm.controls['value'].value > 0">
					
					{{discountForm.controls['name'].value}} - 
					<span *ngIf="!discountForm.controls['isPercentage'].value">$</span>
					{{discountForm.controls['value'].value}} 
					<span *ngIf="discountForm.controls['isPercentage'].value">%</span>
					off
				</div>
			</div>
			<hr />
			`,
			styleUrls:['./discounts.css', '../solar-bootstrap-theme.min.css']
})

export class AddDiscountComponent {
	discountForm:FormGroup;
	formType:String = "Add"; 
	errorTypes = AddItemErrors;
	error:AddItemErrors = null;

	constructor(fb:FormBuilder, private productService:ProductService){
		this.discountForm = fb.group({
			'name':[null, Validators.compose([Validators.required])],
			'value':[null, Validators.compose([Validators.required])],
			'isPercentage':false
			});	
	}

	submitForm(values:iDiscount){
		this.clearError();

		this.productService.addDiscount(values)
			.subscribe((discountRes:iDiscountResponse)=>{
				this.discountForm.reset();
				
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

	ngOnInit(){
		
	}

	ngOnDestroy(){
	}

}
