/*
*	customer.form.component.ts
*	Author: Chris Beasley
*	This is the form for customer.
*/

import { Component } from '@angular/core';

@Component({
	selector: 'customer-form',
	template: `
		<form>
			<label for="cusName">Customer Name</label>
			<input type="text" 
					id="cusName"
					placeholder="Enter Name Here"/>
			<label for="cusEmail">Customer Email</label>
			<input type="text" 
					id="cusEmail"
					placeholder="Enter Email Here"/>
			<label for="cusPhone">Customer Phone</label>
			<input type="number" 
					id="cusPhone"
					placeholder="Enter Phone # Here"/>

			<button type="submit">Create Profile</button>

		</form>
	`
})

export class CustomerFormComponent{

}
