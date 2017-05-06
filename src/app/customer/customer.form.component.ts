/*
*	customer.form.component.ts
*	Author: Chris Beasley
*	This is the form for customer.
*/

import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { iCustomer, CustomerProfile } from '../classes';
import { eAppErrors } from '../enums';


@Component({
	selector: 'customer-form',
	template: `
		<form [formGroup]="customerForm" (ngSubmit)="submitForm(customerForm.value)">
			<label for="cusName">Customer Name</label>
			<input type="text" 
					(focus)="customerForm.controls['name'].setValue('')"
					id="cusName"
					placeholder="Enter Name Here"
					[formControl]="customerForm.controls['name']"/>

			<label for="cusEmail">Customer Email</label>
			<input type="text" 
					(focus)="customerForm.controls['email'].setValue('')"
					id="cusEmail"
					placeholder="Enter Email Here"
					[formControl]="customerForm.controls['email']"/>

			<label for="cusPhone">Customer Phone</label>
			<input type="number"
					(focus)="customerForm.controls['phone'].setValue('')"
					id="cusPhone"
					placeholder="Enter Phone # Here"
					[formControl]="customerForm.controls['phone']"/>

			<button type="submit" [disabled]="!customerForm.valid">Create Profile</button>

			<div [ngSwitch]="error">
				<div *ngSwitchCase="eAppErrors.DUPLICATE">
					Customer email already exists.
				</div>
				<div *ngSwitchCase="eAppErrors.INVALID">
					Not a valid email.
				</div>
				<div *ngSwitchCase="eAppErrors.INVALID">
					Not a valid Phone Number.
				</div>
			</div>

		</form>
		<div class="list-group">
			<div class="list-group-item" *ngFor="let customer of customers">
				{{customer.phone}}: {{customer.name}} - {{customer.email}}
			</div>
		</div>
	`,
	styleUrls:['../styles/style.css']
})

export class CustomerFormComponent{
	customerForm:FormGroup;
	customers:CustomerProfile[] = [];

	error:eAppErrors = null;
	eAppErrors = eAppErrors;

	constructor(private fb:FormBuilder){}

	ngOnInit(){
		this.initForm();
	}

	initForm(){
		this.customerForm = this.fb.group({
			'name':[null, Validators.compose([Validators.required])],
			'email':[null, Validators.compose([Validators.required])],
			'phone':[null, Validators.compose([Validators.required])]
		});
	}

	submitForm(values:iCustomer){

		if(!this.isCustomer(values)){
			this.customers.push(this.createCustomer(values));
			this.clearError();
		}
		else{
			this.setError(eAppErrors.DUPLICATE);
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
