/*
*	edit-customer.component.ts
*	Author: Chris Beasley
*	EditCustomerComponent will edit customer profile.
*/
import { Component } from '@angular/core';
import { eFormType, eAppErrors } from '../enums';
import { CustomerProfile, iCustomer } from '../classes';
import { CustomerService } from '../services/customer.service';

@Component({
	selector: 'edit-customer',
	template: `
		<h2>Edit Customer Profile</h2>

		<div class="list-group">
				<div class="list-group-item search">
					<input type="search" placeholder="Search Customer Profiles" [(ngModel)]="search" />
				</div>
				<span *ngIf="customers">
					<a 
						class="list-group-item" 
						*ngFor="let customer of customers | find:{key:'email', value:search}"
						[ngClass]="{'active':chosenCustomer == customer}"
						(click)="setChosenCustomer(customer);" 
						>
						{{customer.email}} - {{customer.name}} - {{customer.phone}} 
					</a>
				</span>
		</div>
		<div *ngIf="chosenCustomer">
			<customer-form 
				[type]="eFormType.EDIT" 
				[chosenCustomer]="chosenCustomer" 
				(updated)="closeEdit()"></customer-form>
		</div>
	`,
	styleUrls:['./customers.css']
})

export class EditCustomerComponent{
	eFormType:typeof eFormType = eFormType;
	customers:CustomerProfile[] = null;
	chosenCustomer:CustomerProfile = null;
	search:String = "";

	constructor(private customerService:CustomerService){}

	ngOnInit(){
		this.customerService
			.getCustomers()
			.subscribe((customers:CustomerProfile[])=>{
				this.customers = customers;
			})
	}

	setChosenCustomer(customer:CustomerProfile){
		this.chosenCustomer = customer;
	}

	closeEdit(){
		this.chosenCustomer = null;
	}
}