/*
*	edit-discount.component.ts
*	Author: Leon Watson
*	EditDiscountComponent will edit discounts to the service.
*
*/
import { Component } from '@angular/core';
import { eFormType } from '../enums';
import { Discount } from '../classes';
import { DiscountService } from '../services/discount.service';

@Component({
	template:`
		<h2>Edit Discounts</h2>

		<div class="list-group">
			<div 
				class="list-group-item" 
				*ngFor="let discount of discounts"
				(click)="setChosenDiscount(discount)"
			>
				{{discount.id}}: {{discount.name}} - {{discount.value}}
			</div>
		</div>

		<discount-form 
			*ngIf="chosenDiscount"
			[type]="eFormType.EDIT" 
			[chosenDiscount]="chosenDiscount" 
			(updated)="clostEdit()">
			</discount-form>
	`
})

export class EditDiscountComponent{
	eFormType = eFormType;
	discounts:Discount[] = [];
	chosenDiscount:Discount = null;
	constructor(private discountService:DiscountService){}

	ngOnInit(){
		this.updateDiscounts();
	}

	updateDiscounts(){
		this.discountService.getDiscounts()
			.subscribe((discounts:Discount[])=>{
				this.discounts = discounts;
			}, (err)=>{
				console.log(err);
			})
	}

	setChosenDiscount(discount:Discount){
		this.chosenDiscount = discount;
	}

	closeEdit(){
		this.chosenDiscount = null;
	}
}