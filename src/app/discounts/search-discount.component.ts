import { Component } from '@angular/core';
import { Discount,Product } from '../classes';
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
					<a class="list-group-item" *ngFor="let discount of discounts | find:{key:'name', value:search}">
						{{discount.name}} - 
						$
						{{discount.cost}} 
						
						
					</a>
				</span>
			</div>
			`,
			styleUrls:['../discounts/discounts.css','../solar-bootstrap-theme.min.css']

})

export class SearchDiscountComponent {
	discounts:Product[] = null
	search:String = "";
	constructor(private productService:ProductService){}

	ngOnInit(){
		this.productService
			.getProducts()
			.subscribe((discounts:Product[])=>{
				this.discounts = discounts;
			})
	}
}
