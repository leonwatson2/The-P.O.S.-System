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
			<div class="list-group-item search">
				<input type="search" placeholder="Search Discounts" [(ngModel)]="search" />
			</div>
			<a 
				class="list-group-item" 
				*ngFor="let discount of discounts | find:{key:'name', value:search}"
				[ngClass]="{'active':chosenDiscount == discount}"
				(click)="setChosenDiscount(discount)"
			>
				<display-discount [discount]="discount"></display-discount>
			</a>
		</div>

		<discount-form 
			*ngIf="chosenDiscount"
			[type]="eFormType.EDIT" 
			[chosenDiscount]="chosenDiscount" 
			(updated)="closeEdit()">
			</discount-form>
	`

})

export class EditDiscountComponent{
	eFormType = eFormType;
	discounts:Discount[] = [];
	chosenDiscount:Discount = null;
	search:String = "";

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
		console.log(discount);
		this.chosenDiscount = discount;
	}

	closeEdit(){
		this.chosenDiscount = null;
	}
}