/*
*	Author:Leon Watson
*	This is the form for discounts.
*/

import { Component } from '@angular/core';

@Component({
	selector:'discount-form',
	template:`
		<form>
			<label for="disName">Discount Name</label>
			<input type="text" 
					id="disName"
					placeholder="PAPA50"/>
			<label for="disValue">Discount Value</label>
			<input type="number" 
					id="disValue"
					placeholder="PAPA50"/>

			<label for="isPerc">Is Percentage</label>
			<input type="checkbox" id="isPerc"/>

			<button type="submit">Add Discount</button>

		</form>
	`
})

export class DiscountFormComponent{

}