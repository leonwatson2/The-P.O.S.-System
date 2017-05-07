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

			<button type="submit" [disabled]="!customerForm.valid">

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
	styleUrls:['../styles/style.css']
})

export class CustomerFormComponent{
	@Input('type') typeForm:eFormType;
	@Input() chosenCustomer:CustomerProfile = null;
	@Output() updated = new EventEmitter();
	eFormType = eFormType;
	customerForm:FormGroup;
	customers:CustomerProfile[] = [
		new CustomerProfile("Jim", "Chris", "Chris", "jim@", 8306139886),
		new CustomerProfile("Bob", "Rey", "Chris", "bob@", 8306305555),
		new CustomerProfile("Dan", "Leon", "Chris", "dan@", 8307983803),
	];


	error:eAppErrors = null;
	eAppErrors = eAppErrors;

	constructor(private fb:FormBuilder, private customerService:CustomerService){}

	ngOnInit(){
		this.initForm();
	}

	initForm(customer:CustomerProfile = null){
		if(customer == null){
			this.customerForm = this.fb.group({
				'name':[null, Validators.compose([Validators.required])],
				'email':[null, Validators.compose([Validators.required])],
				'phone':[null, Validators.compose([Validators.required])]
			});
		} else {
			this.customerForm = this.fb.group({
				'name':[customer.name, Validators.compose([Validators.required])],
				'email':[customer.email, Validators.compose([Validators.required])],
				'phone':[customer.phone, Validators.compose([Validators.required])]
			});
		}
	}

	submitForm(values:iCustomer){
		if(this.typeForm == eFormType.ADD){
			this.addCustomer(values);
		} else if(this.typeForm == eFormType.EDIT){
			this.updateCustomer(this.chosenCustomer, values);
		}
	}

	updateCustomer(oldCustomer:CustomerProfile, newCustomer:iCustomer){
		let index = this.customers.findIndex((c)=>{
			if(c.email == oldCustomer.email)
				return true;
		}); 
		let newC = this.createCustomer(newCustomer);
		if(!newC.isValidPhone())
			this.setError(eAppErrors.INVALID);
		else if(index > -1){
			this.customers[index] = new CustomerProfile(
										newCustomer.name,
										newCustomer.associatename,
										newCustomer.managename,
										oldCustomer.email,
										newCustomer.phone,
										newCustomer.receipts)
			this.updated.emit({});
			this.clearError();
			this.initForm();
		} else if(index == -1){
			this.setError(eAppErrors.NOTFOUND);
		}
	}

	// Adds customer to array.
	// Sets error if value is not valid or a duplicate.
	addCustomer(customer:iCustomer){
		this.customerService.addCustomer(customer)
							.subscribe((response:iCustomerResponse)=>{
								console.log(response.customer);
								this.customerForm.reset();
							}, (response:iCustomerResponse)=>{
								this.setError(response.error)
							});
	}

	setChosenCustomer(customer:CustomerProfile){
		this.chosenCustomer = customer;
		this.initForm(customer);
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
