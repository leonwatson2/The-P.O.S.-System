import { Component } from '@angular/core';
import { Discount } from '../classes';
import { ProductService } from '../services/product.service';

@Component({
	selector: 'search-discount',
	template: `
			<h2>Search Discount</h2>
				<ul>
					<li *ngFor="let discount of discounts">
						{{discount.name}} - {{discount.value}} <span *ngIf="discount.isPercentage()">% off</span>
					</li>
				</ul>
			`,
})

export class SearchDiscountComponent {
	discounts:Discount[] = null
	constructor(private productService:ProductService){}

	ngOnInit(){
		this.productService
			.getDiscounts()
			.subscribe((discounts:Discount[])=>{
				this.discounts = discounts;
			})
	}
}
