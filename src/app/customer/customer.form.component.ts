/*
*	customer.form.component.ts
*	Author: Chris Beasley
*	This is the form for customer.
*/

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { iCustomer, CustomerProfile } from '../classes';
import { eAppErrors, eFormType } from '../enums';
import { CustomerService, iCustomerResponse } from '../services/customer.service';


@Component({
	selector: 'customer-form',
	template: `
		<form [formGroup]="customerForm" class="customer-form" (ngSubmit)="submitForm(customerForm.value)">
			
			<input type="text" 
					(focus)="customerForm.controls['name'].setValue('')"
					placeholder="Customer Name"
					[ngClass]="{'has-error':!customerForm.controls['name'].valid && customerForm.controls['name'].touched}"
					[formControl]="customerForm.controls['name']"/>

			
			<input type="text" 
					(focus)="customerForm.controls['email'].setValue('')"
					placeholder="Customer Email"
					[ngClass]="{'has-error':!customerForm.controls['email'].valid && customerForm.controls['email'].touched}"
					[formControl]="customerForm.controls['email']"/>

			
			<input type="number"
					(focus)="customerForm.controls['phone'].setValue('')"
					placeholder="Enter Phone # Here"
					[ngClass]="{'has-error':!customerForm.controls['phone'].valid && customerForm.controls['phone'].touched}"
					[formControl]="customerForm.controls['phone']"/>

			<button type="submit" class="btn btn-success" [disabled]="!customerForm.valid">
				<span>{{ typeForm == eFormType.ADD ? "Create":"Update" }}</span> Profile
			</button>

			<div [ngSwitch]="error">
				<div *ngSwitchCase="eAppErrors.DUPLICATE">
					Customer email already exists.
				</div>
				<!--<div *ngSwitchCase="eAppErrors.INVALID">
					Not a valid email.
				</div>-->
				<div *ngSwitchCase="eAppErrors.INVALID">
					Not a valid Phone Number.
				</div>
			</div>

		</form>

	`,
	styleUrls:['./customers.css']
})

export class CustomerFormComponent{
	@Input('type') typeForm:eFormType;
	@Input() chosenCustomer:CustomerProfile = null;
	@Output() updated = new EventEmitter();
	eFormType = eFormType;
	customerForm:FormGroup;
	customers:CustomerProfile[] = [];


	error:eAppErrors = null;
	eAppErrors = eAppErrors;

	constructor(private fb:FormBuilder, private customerService:CustomerService){}

	ngOnInit(){
	}

	ngOnChanges(){
		this.initForm();
	}

	initForm(customer:CustomerProfile = null){
		if(this.typeForm == eFormType.ADD){
			this.customerForm = this.fb.group({
				'name':[null, Validators.compose([Validators.required])],
				'email':[null, Validators.compose([Validators.required])],
				'phone':[null, Validators.compose([Validators.required])]
			});
		} else if(this.typeForm == eFormType.EDIT){
			this.customerForm = this.fb.group({
				'name':[this.chosenCustomer.name, Validators.compose([Validators.required])],
				'email':[this.chosenCustomer.email, Validators.compose([Validators.required])],
				'phone':[this.chosenCustomer.phone, Validators.compose([Validators.required])]
			});
		}
	}

	submitForm(values):void{
		this.clearError();
		if(this.typeForm == eFormType.ADD){

			this.customerService.addCustomer(values)
					.subscribe((customerRes:iCustomerResponse)=>{
						this.customerForm.reset();
					}, (customerResError)=>{
						this.setError(customerResError.error);
					
				});
		}else if(this.typeForm == eFormType.EDIT){
			console.log(values);
			this.customerService
			.updateCustomer(this.chosenCustomer, values)
			.subscribe((customerRes:iCustomerResponse)=>{
				this.customerForm.reset();
				this.chosenCustomer = null;
				this.updated.emit();
			}, (customerResError)=>{
				this.setError(customerResError.error);
		});
		}
	}

	createCustomer(customer:iCustomer):CustomerProfile{
		return new CustomerProfile(
				customer.name,
				customer.associatename,
				customer.managename,
				customer.email,
				customer.phone,
				customer.receipts
			);
	}

	//Check if a customer with the same email exists.
	isCustomer(customer:iCustomer):Boolean{
		let bool = this.customers.findIndex((c)=>{
			return c.email == customer.email
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
