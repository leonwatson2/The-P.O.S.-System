import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiscountService, iDiscountResponse } from '../services/discount.service';
import { eAppErrors, eFormType } from '../enums'; 
import { Discount } from '../classes';


 @Component({
 	selector: 'discount-form',
 	template: 
  `
			<form [formGroup]="discountForm" class="discount-form" (ngSubmit)="submitForm(discountForm.value)">
				<input type="text"
					(focus)="discountForm.controls['name'].setValue('')" 
					placeholder="Discount Name"
					[ngClass]="{'has-error':!discountForm.controls['name'].valid && discountForm.controls['name'].touched}"
					[formControl]="discountForm.controls['name']"/>
				<input type="number" 
					(focus)="discountForm.controls['value'].setValue('')" 
					placeholder="Amount off"
					min=0
					[ngClass]="{'has-error':!discountForm.controls['value'].valid && discountForm.controls['value'].touched}"
					[formControl]="discountForm.controls['value']"/>
				<div>
					<label for="isPerc" class="btn" [ngClass]="{'btn-primary':discountForm.controls['isPercentage'].value}">{{discountForm.controls['isPercentage'].value ? "Percentage Off":"Dollar Off"}}</label>
					<input type="checkbox" name="isPercentage" id="isPerc" [formControl]="discountForm.controls['isPercentage']"/>
				</div>
				<button type="submit" class="btn btn-success" [disabled]="!discountForm.valid">
					<span>{{ type == eFormType.ADD ? "Add":"Updates" }}</span> Discount
				</button>
				
				<div [ngSwitch]="error">
					<div 
						*ngSwitchCase="eAppErrors.DUPLICATE">
						Discount name already exist
					</div>
					<div 
						*ngSwitchCase="eAppErrors.INVALID">
						Discount value
						<span *ngIf="!discountForm.controls['isPercentage'].value"> must be positive. </span>
						<span *ngIf="discountForm.controls['isPercentage'].value">must be between 0 and 100 if a percentage type of discount.</span>
					</div>
				</div>

			</form>`,
			styleUrls:['./discounts.css']
 })
 export class DiscountFormComponent {
 	@Input() type:eFormType;
 	@Input() chosenDiscount:Discount;
 	@Output() updated = new EventEmitter();
 	eAppErrors:typeof eAppErrors = eAppErrors;
	eFormType:typeof eFormType = eFormType;

	discountForm:FormGroup;
	error:eAppErrors;

 	constructor(private fb:FormBuilder, private discountService:DiscountService){		}
	ngOnInit(){
		
	}
	ngOnChanges(){
		this.initForm();
	}

	initForm(){
		if(this.type == eFormType.ADD){
			this.discountForm = this.fb.group({
			'name':[null, Validators.compose([Validators.required])],
			'value':[null, Validators.compose([Validators.required])],
			'isPercentage':false
			});
		}else if(this.type == eFormType.EDIT){
			this.discountForm = this.fb.group({
			'name':[this.chosenDiscount.name, Validators.compose([Validators.required])],
			'value':[this.chosenDiscount.value, Validators.compose([Validators.required])],
			'isPercentage':this.chosenDiscount.isPercentage()
			});
		}
	}

	submitForm(values):void{
		this.clearError();
		if(this.type == eFormType.ADD){

			this.discountService.addDiscount(values)
					.subscribe((discountRes:iDiscountResponse)=>{
						this.discountForm.reset();
					}, (discountResError)=>{
						this.setError(discountResError.error);
					
				});
		}else if(this.type == eFormType.EDIT){
			this.discountService
			.updateDiscount(this.chosenDiscount, values)
			.subscribe((discountRes:iDiscountResponse)=>{
				this.discountForm.reset();
				this.chosenDiscount = null;
				this.updated.emit();
			}, (discountResError)=>{
				this.setError(discountResError.error);
			
		});
		}
	}

	setError(errorMes:eAppErrors):void{
		this.error = errorMes;
	}

	clearError():void{
		this.error = null;
	}
 }