/*
*	edit-discount.component.ts
*	Author: Leon Watson
*	EditDiscountComponent will edit discounts to the service.
*
*/
import { Component } from '@angular/core';
import { eFormType } from '../enums';

@Component({
	template:`
		<h2>Edit Discounts</h2>
		<discount-form [type]="eFormType.EDIT"></discount-form>
	`
})

export class EditDiscountComponent{
	eFormType = eFormType;
}