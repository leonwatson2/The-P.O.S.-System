/*
*	edit-customer.component.ts
*	Author: Chris Beasley
*	EditCustomerComponent will edit customer profile.
*/
import { Component } from '@angular/core';
import { eFormType } from '../enums';
import { CustomerProfile } from '../classes';
import { CustomerService } from '../services/customer.service';

@Component({
	template:`
		<h2>Edit Customer Profile</h2>

		<div class="list-group">
			<div 
				class="list-group-item" 
				*ngFor="let customer of customers"
				(click)="setChosenCustomer(customer)"
			> 
				{{customer.phone}}: {{customer.name}} - {{customer.email}}
			</div>
		</div>

		<customer-form 
			*ngIf="chosenCustomer"
			[type]="eFormType.EDIT" 
			[chosenCustomer]="chosenCustomer" 
			(updated)="closeEdit()">
		</customer-form>
	`
})

export class EditCustomerComponent{
	eFormType = eFormType;
	customers:CustomerProfile[] = [];
	chosenCustomer:CustomerProfile = null;
	constructor(private customerService:CustomerService){}

	ngOnInit(){
		this.updateCustomer();
	}

	updateCustomer(){
		this.customerService.getCustomers()
			.subscribe((customers:CustomerProfile[])=>{
				this.customers = customers;
			
		    }, (err)=>{
		    	console.log(err);
		    })
	}

	setChosenCustomer(customer:CustomerProfile){
		this.chosenCustomer = customer;
	}

	closeEdit(){
		this.chosenCustomer = null;
	}
}