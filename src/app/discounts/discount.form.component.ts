/*
*	Author:Leon Watson
*	This is the form for discounts.
*/

import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { iDiscount, Discount } from '../classes';
import { eAppErrors, eFormType } from '../enums';


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
				<span *ngIf="!discountForm.controls['isPercentage'].value || discountForm.controls['value'].value < 0">
					Discount value must be positive.
				</span>
				<span *ngIf="discountForm.controls['isPercentage'].value">
					Discount value must be between 0 and 100.
				</span>
				</div>
			</div>

		</form>
		<div class="list-group">
			<div 
				class="list-group-item" 
				*ngFor="let discount of discounts"
				(click)="setChosenDiscount(discount)"
			>
				{{discount.id}}: {{discount.name}} - {{discount.value}}
			</div>
		</div>
		
	`,
	styleUrls:['../solar-bootstrap-theme.min.css']
})

export class DiscountFormComponent{
	@Input('type') typeForm:eFormType;
	//type variable for the type of form:eFormType import 
	eFormType = eFormType;
	discountForm:FormGroup;
	discounts:Discount[] = [
		new Discount(23, "PAPA", 234, false),
		new Discount(25, "PAPA", 234, false),
		new Discount(26, "PAPA32", 234, false),
	];
	chosenDiscount:Discount = null;

	error:eAppErrors = null;
	eAppErrors = eAppErrors;

	constructor(private fb:FormBuilder){}

	ngOnInit(){
		this.initForm();
	}

	initForm(discount:Discount = null){
		if(discount == null){

			this.discountForm = this.fb.group({
				'name':[null, Validators.compose([Validators.required])],
				'value':[null, Validators.compose([Validators.required])],
				'isPercentage':true
			});
		} else {
			this.discountForm = this.fb.group({
				'name':[discount.name, Validators.compose([Validators.required])],
				'value':[discount.value, Validators.compose([Validators.required])],
				'isPercentage':discount.isPercentage
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
		let index = this.discounts.findIndex((d)=>{
			if(d.id == oldDiscount.id)
				return true;
		});
		let newD = this.createDiscount(newDiscount);
		if(!newD.isValidValue())
			this.setError(eAppErrors.INVALID);
		else if(index > -1){
			this.discounts[index] = new Discount(
								oldDiscount.id, 
								newDiscount.name,
								newDiscount.value,
								newDiscount.isPercentage);
			this.clearError();
			this.initForm();
		}else if(index == -1){
			this.setError(eAppErrors.NOTFOUND);
		}

	}

	//addDiscount(discount:Discount)
	// Adds discount to array
	// Sets error if value is not valid or discount exists
	addDiscount(discount:iDiscount){
		if(!this.isDiscount(discount)){
			let newDiscount = this.createDiscount(discount);
			if(newDiscount.isValidValue()){
				this.discounts.push(newDiscount);
				this.clearError();
				this.initForm();
			}else{
				this.setError(eAppErrors.INVALID);
			}
		}
		else{
			this.setError(eAppErrors.DUPLICATE);
		}
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