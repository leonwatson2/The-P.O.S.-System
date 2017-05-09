import { Component } from '@angular/core';
import { Product } from '../classes';
import { ProductService } from '../services/product.service';

@Component({
	selector: 'search-product',
	template: `
		<h2>Search Product</h2>
		<div class="list-group">
			<div class="list-group-item search">
				<input type="search" placeholder="Search an Item" [(ngModel)]="search"/>
			</div>
			<span *ngIf="products">
				<a class="list-group-item" (click)="setChosenProduct(product);" *ngFor="let product of products | find:{key:'name', value:search}">
					{{product.name}}	
					<span>$</span>
					{{product.cost}}
					<span>X</span>
					{{product.amount}}
				</a>
			</span>
		</div>
		`,
		styleUrls:['../styles/style.css']
})

export class SearchProductComponent{
	products: Product[] = null;
	search: String = "";
	constructor(private productService:ProductService){}
	
	ngOnInit(){
		this.productService
			.getProducts()
			.subscribe((products:Product[])=>{
				this.products = products;
			})
	}
}