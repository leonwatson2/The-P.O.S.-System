/*
*	search-customer.component.ts
*	Author: Chris Beasley
*	
*/

import { Component } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { CustomerProfile } from '../classes';


@Component({
	selector: 'search-customer',
	template: `
			<h2>Search Customer</h2>

			<div class="list-group">
				<div class="list-group-item search" >
					<input type="search" placeholder="Search Customer Profiles" [(ngModel)]="search" />
				</div>
				<span *ngIf="customers">
					<a class="list-group-item" (click)="setChosenCustomer(customer);" *ngFor="let customer of customers | find:{key:'email', value:search}">
						{{customer.email}} - {{customer.name}} - {{customer.phone}}
					</a>
				</span>
			</div>
			`,
			styleUrls:['./customers.css']
})

export class SearchCustomerComponent{
	search:String = "";
	customers:CustomerProfile[] = null;
	constructor(private customerService:CustomerService){}

	ngOnInit(){
		this.updateCustomer();
	}

	updateCustomer(){
		this.customerService
			.getCustomers()
			.subscribe((customers:CustomerProfile[])=>{
				this.customers = customers;
			})
	}

}