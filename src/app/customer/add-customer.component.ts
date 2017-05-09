/*
*	add-customer.component.ts
*	Author: Chris Beasley
*	AddCustomerComponent will add customer profile to service.
*/

import { Component } from '@angular/core';
import { eFormType } from '../enums';

@Component({
	selector: 'add-customer',
	template: `
		<h2>Add Customer Profile</h2>
		<customer-form [type]="eFormType.ADD"></customer-form>
	`
})

export class AddCustomerComponent{

	eFormType:typeof eFormType = eFormType;

	constructor(){}

	ngOnInit(){	
	}

	ngOnDestroy(){
	}
}