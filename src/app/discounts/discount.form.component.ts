/*
*	Author:Leon Watson
*	This is the form for discounts.
*/

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { iDiscount, Discount } from '../classes';
import { eAppErrors, eFormType } from '../enums';
import { DiscountService, iDiscountResponse } from '../services/discount.service';

@Component({
	selector:'discount-form',
	template:`
		<form [formGroup]="discountForm" (ngSubmit)="submitForm(discountForm.value)">
			<label for="disName">Discount Name</label>
			<input type="text" 
					(focus)="discountForm.controls['name'].setValue('')"
					id="disName"
					placeholder="PAPA50"
					[formControl]="discountForm.controls['name']"/>


			<label for="disValue">Discount Value</label>
			<input type="number" 
					(focus)="discountForm.controls['value'].setValue('')"
					id="disValue"
					placeholder="PAPA50"
					[formControl]="discountForm.controls['value']"/>



			<label for="isPerc">Is Percentage</label>
			<input 
					type="checkbox" 
					id="isPerc"
					[formControl]="discountForm.controls['isPercentage']"/>

			<button type="submit" [disabled]="!discountForm.valid">

			<span>{{ typeForm == eFormType.ADD ? "Add":"Update" }}</span> Discount

			</button>
				
			<div [ngSwitch]="error">
				<div *ngSwitchCase="eAppErrors.DUPLICATE">
					Discount name already exist.
				</div>
				<div *ngSwitchCase="eAppErrors.INVALID">
				<span *ngIf="!discountForm.controls['isPercentage'].value && discountForm.controls['value'].value < 0">
					Discount value must be positive.
				</span>
				<span *ngIf="discountForm.controls['isPercentage'].value">
					Discount value must be between 0 and 100.
				</span>
				</div>
			</div>

		</form>
		
		
	`,
	styleUrls:['../solar-bootstrap-theme.min.css']
})

export class DiscountFormComponent{
	@Input('type') typeForm:eFormType;
	@Input() chosenDiscount:Discount = null;
	@Output() updated = new EventEmitter();
	//type variable for the type of form:eFormType import 
	eFormType = eFormType;
	discountForm:FormGroup;
	discounts:Discount[] = [
		new Discount(23, "PAPA", 234, false),
		new Discount(25, "PAPA", 234, false),
		new Discount(26, "PAPA32", 234, false),
	];
	

	error:eAppErrors = null;
	eAppErrors = eAppErrors;

	constructor(private fb:FormBuilder, private discountService:DiscountService){}

	ngOnInit(){
		this.initForm();
	}

	initForm(discount:Discount = null){
		if(this.typeForm == eFormType.ADD){

			this.discountForm = this.fb.group({
				'name':[null, Validators.compose([Validators.required])],
				'value':[null, Validators.compose([Validators.required])],
				'isPercentage':true
			});
		} else {
			this.discountForm = this.fb.group({
				'name':[this.chosenDiscount.name, Validators.compose([Validators.required])],
				'value':[this.chosenDiscount.value, Validators.compose([Validators.required])],
				'isPercentage':this.chosenDiscount.isPercentage()
			});
		}
	}

	submitForm(values:iDiscount){
		//check if the discount already exist
		if(this.typeForm == eFormType.ADD){
			this.addDiscount(values);
		} else if(this.typeForm == eFormType.EDIT){
			this.updateDiscount(this.chosenDiscount, values);
		}
	}
	// updateDiscount(oldDiscount:Discount, newDiscount:iDiscount)
	// finds the index of old discount by id in array
	// updates the value of old discount
	// sets error if the discount does not exist or values are not valid
	updateDiscount(oldDiscount:Discount, newDiscount:iDiscount){
		this.discountService.updateDiscount(oldDiscount, newDiscount)
							.subscribe((response:iDiscountResponse)=>{
								this.updated.emit({});
								this.clearError();
								this.discountForm.reset();
							},(response:iDiscountResponse)=>{
								this.setError(response.error);
							})

	}

	//addDiscount(discount:Discount)
	// Adds discount to array
	// Sets error if value is not valid or discount exists
	addDiscount(discount:iDiscount){
		this.discountService.addDiscount(discount)
							.subscribe((response:iDiscountResponse)=>{
								console.log(response.discount);
								this.discountForm.reset();
							}, (response:iDiscountResponse)=>{
								this.setError(response.error);
							});
	}

	setChosenDiscount(discount:Discount){
		this.chosenDiscount = discount;
		this.initForm(discount);
	}

	//	createDiscount(discount:iDiscount)
	//Create Discount returns a Discount object 
	//	with a random id from the interface values passed in.
	createDiscount(discount:iDiscount):Discount{
		return new Discount(
				Math.floor(Math.random()*10000000000),
				discount.name,
				discount.value,
				discount.isPercentage
			);
	}

	//	isDiscount(discount:iDiscount):Boolean
	//Checks if a discount with the same name exist in discount array
	//	return true or false, using findIndex
	isDiscount(discount:iDiscount):Boolean{
		let bool = this.discounts.findIndex((d)=>{
			return d.name == discount.name
		})
		return bool >= 0;
	}

	setError(num:eAppErrors){
		this.error = num;
	}

	clearError(){
		this.error = null;
	}

}