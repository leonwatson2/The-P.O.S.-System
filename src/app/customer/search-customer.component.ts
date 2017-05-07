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
			<div class="list-group-item"><input type="text" [(ngModel)]="search" /></div>
			<div 
				class="list-group-item" 
				*ngFor="let customer of customers"
			> 
				{{customer.phone}}: {{customer.name}} - {{customer.email}}
			</div>
		</div>


			`,
})

export class SearchCustomerComponent{
	search:String;
	customers:CustomerProfile[] = [];
	constructor(private customerService:CustomerService){}

	ngOnInit(){
		this.updateCustomer();
	}

	updateCustomer(){
		this.customerService.getCustomers()
							.subscribe((customers:CustomerProfile[])=>{
								this.customers = customers;
							})
	}

}