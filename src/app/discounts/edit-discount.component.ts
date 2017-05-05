import { Component } from '@angular/core';

import { DiscountService } from '../services/discount.service';
import { Discount, iDiscount } from '../classes';
import { eAppErrors, eFormType } from '../enums';


@Component({
	selector: 'edit-discount',
	template: `
			<h2>Edit Discount</h2>
			<div class="list-group">
				<div class="list-group-item search">
					<input type="search" placeholder="Search an Item" [(ngModel)]="search" />
				</div>
				<span *ngIf="discounts">
					<a class="list-group-item" (click)="setChosenDiscount(discount);" *ngFor="let discount of discounts | find:{key:'name', value:search}">
						{{discount.name}} - 
						<span *ngIf="!discount.isPercentage()">$</span>
						{{discount.value}} 
						<span *ngIf="discount.isPercentage()">%</span> 
						off
					</a>
				</span>
			</div>
			<div *ngIf="chosenDiscount">
				<discount-form 
					[type]="eFormType.EDIT" 
					[chosenDiscount]="chosenDiscount" 
					(updated)="closeEdit()"></discount-form>
			</div>
			
			`,
			styleUrls:['./discounts.css']
})

export class EditDiscountComponent {
	
	discounts:Discount[] = null;
	chosenDiscount:Discount = null;
	search:String = "";
	eFormType:typeof eFormType = eFormType; 

	constructor(private discountService:DiscountService){}

	ngOnInit(){
		
		this.discountService
			.getDiscounts()
			.subscribe((discounts:Discount[])=>{
				this.discounts = discounts;
			})

	}

	setChosenDiscount(discount:Discount){
		
		this.chosenDiscount = discount;
	}

	closeEdit(){
		this.chosenDiscount = null;
	}
	


}
