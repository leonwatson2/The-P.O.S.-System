/*
*	add-customer.component.ts
*	Author: Chris Beasley
*	AddCustomerComponent will add customer profile to service.
*/

import { Component } from '@angular/core';


@Component({
	selector: 'add-customer',
	template: `
		<h2>Add Customer Profile</h2>
		<customer-form></customer-form>
	`
})

export class AddCustomerComponent{

}