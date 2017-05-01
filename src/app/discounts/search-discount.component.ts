import { Component } from '@angular/core';
import { Discount } from '../classes';
import { ProductService } from '../services/product.service';

@Component({
	selector: 'search-discount',
	template: `
			<h2>Search Discount</h2>
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
			`,
			styleUrls:['./discounts.css','../solar-bootstrap-theme.min.css']

})

export class SearchDiscountComponent {
	discounts:Discount[] = null
	search:String = "";
	constructor(private productService:ProductService){}

	ngOnInit(){
		this.productService
			.getDiscounts()
			.subscribe((discounts:Discount[])=>{
				this.discounts = discounts;
			})
	}
}
