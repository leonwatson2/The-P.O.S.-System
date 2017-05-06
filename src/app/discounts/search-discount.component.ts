import { Component } from '@angular/core';
import { DiscountService } from '../services/discount.service';
import { Discount } from '../classes';

@Component({
	selector: 'search-discount',
	template: `
			<h2>Search Discount</h2>
			<div class="list-group">
			<div class="list-group-item"><input type="text" [(ngModel)]="search"/></div>
			<div 
				class="list-group-item" 
				*ngFor="let discount of discounts"
			>
					{{discount.id}}: {{discount.name}} - {{discount.value}}
				</div>
			</div>
			`,
})

export class SearchDiscountComponent {
	search:String;
	discounts:Discount[] =[];
	constructor(private discountService:DiscountService){}

	ngOnInit(){
		this.updateDiscounts();
	}

	updateDiscounts(){
		this.discountService.getDiscounts()
							.subscribe((discounts:Discount[])=>{
								this.discounts = discounts;
							})
	}
}
