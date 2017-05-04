/*
*	Author:Leon Watson
*	This is the form for discounts.
*/

import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { iDiscount, Discount } from '../classes';

@Component({
	selector:'discount-form',
	template:`
		<form [formGroup]="discountForm" (ngSubmit)="submitForm(discountForm.value)">
			<label for="disName">Discount Name</label>
			<input type="text" 
					id="disName"
					placeholder="PAPA50"
					[formControl]="discountForm.controls['name']"/>


			<label for="disValue">Discount Value</label>
			<input type="number" 
					id="disValue"
					placeholder="PAPA50"
					[formControl]="discountForm.controls['value']"/>



			<label for="isPerc">Is Percentage</label>
			<input 
					type="checkbox" 
					id="isPerc"
					[formControl]="discountForm.controls['isPercentage']"/>

			<button type="submit">Add Discount</button>
	
		</form>
		<div class="list-group">
			<div class="list-group-item" *ngFor="let discount of discounts">
				{{discount.id}}: {{discount.name}} - {{discount.value}}
			</div>
		</div>
		
	`,
	styleUrls:['../solar-bootstrap-theme.min.css']
})

export class DiscountFormComponent{
	discountForm:FormGroup;
	discounts:Discount[] = [];
	constructor(private fb:FormBuilder){}

	ngOnInit(){
		this.initForm();
	}

	initForm(){
		this.discountForm = this.fb.group({
			'name':[null, Validators.compose([Validators.required])],
			'value':[null, Validators.compose([Validators.required])],
			'isPercentage':true
		});
	}
	submitForm(values:iDiscount){
		//check if the discount already exist
		if(!this.isDiscount(values))
			this.discounts.push(this.createDiscount(values));
		
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


}