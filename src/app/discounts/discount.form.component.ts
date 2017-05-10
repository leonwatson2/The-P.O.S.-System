/*
*	Author:Leon Watson
*	This is the form for discounts.
*/

import { Component, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { iDiscount, Discount } from '../classes';
import { eAppErrors, eFormType } from '../enums';
import { DiscountService, iDiscountResponse } from '../services/discount.service';

@Component({
	selector:'discount-form',
	template:`
		<form [formGroup]="discountForm" (ngSubmit)="submitForm(discountForm.value)">
			<div class="form-group">
				<label for="disName">Discount Name</label>
				<input type="text" 
						class="form-control"
						(focus)="discountForm.controls['name'].setValue('')"
						(blur)="resetFormControl('name')"
						id="disName"
						placeholder="PAPA50"
						[formControl]="discountForm.controls['name']"/>
			</div>

			<div class="form-group">
				<label for="disValue">Discount Value</label>
				<input type="number" 
						class="form-control"
						(focus)="discountForm.controls['value'].setValue('')"
						(blur)="resetFormControl('value')"
						id="disValue"
						placeholder="PAPA50"
						[formControl]="discountForm.controls['value']"/>
			</div>



			<div class="checkbox">
				<label for="isPerc">
				<input 
						type="checkbox" 
						id="isPerc"
						[formControl]="discountForm.controls['isPercentage']"/>
				Is Percentage</label>
			</div>

			<button class="btn btn-success" type="submit" [disabled]="!discountForm.valid">

				<span>{{ typeForm == eFormType.ADD ? "Add":"Update" }}</span> Discount

			</button>

			<button 
					type="button"
					*ngIf="typeForm == eFormType.EDIT"
					class="btn btn-warning"
					(click)="deleteDiscount()">
						Delete Discount
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
	styleUrls:['../styles/style.css']
})


export class DiscountFormComponent{
	@Input('type') typeForm:eFormType;
	@Input() chosenDiscount:Discount = null;
	@Output() updated = new EventEmitter();
	//type variable for the type of form:eFormType import 
	eFormType = eFormType;
	discountForm:FormGroup;
	

	error:eAppErrors = null;
	eAppErrors = eAppErrors;

	constructor(private fb:FormBuilder, private discountService:DiscountService){}

	ngOnInit(){
		this.initForm();
	}

	ngOnChanges(changes){
		if(changes.chosenDiscount){
			if(!changes.chosenDiscount.isFirstChange())
				this.initForm();
		}
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

	deleteDiscount(){
		this.discountService.deleteDiscount(this.chosenDiscount);
		this.updated.emit({})
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

	resetFormControl(formControlName:string){
		if(this.discountForm.controls[formControlName].value == '' && this.typeForm == eFormType.EDIT)
			this.discountForm.controls[formControlName].setValue(this.chosenDiscount[formControlName]);
	}

	setError(num:eAppErrors){
		this.error = num;
	}

	clearError(){
		this.error = null;
	}

}