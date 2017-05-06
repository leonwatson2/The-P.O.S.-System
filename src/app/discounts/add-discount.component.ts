/*
*	add-discount.component.ts
*	Author: Leon Watson
*	AddDiscountComponent will add discounts to the service.
*
*/

import { Component } from '@angular/core';
import { eFormType } from '../enums';

@Component({
	selector: 'add-discount',
	template: `
		<h2>Add Discount</h2>
		<discount-form [type]="eFormType.ADD"></discount-form>
	`
})

export class AddDiscountComponent{

	eFormType = eFormType;

}