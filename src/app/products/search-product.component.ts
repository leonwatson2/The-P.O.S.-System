import { Component } from '@angular/core';
import { Product } from '../classes';
import { ProductService } from '../services/product.service';

@Component({
	selector: 'search-product',
	template: `
		<h2>Search Product</h2>
		<div class="list-group">
			<div class="list-group-item">
				<input type="text" placeholder="Search an Item" [(ngModel)]="search"/>
			</div>
			<div class="list-group-item"
				*ngFor="let product of products">
					{{product.name}}	
					<span>$</span>{{product.cost}}
					<span>X</span>{{product.amount}}
			</div>
		</div>
		`,
		styleUrls:['../styles/style.css']
})

export class SearchProductComponent{
	products: Product[] = [];
	search: String;
	
	constructor(private productService:ProductService){}
	
	ngOnInit(){
		this.updateProducts();
	}
	
	updateProducts(){
		this.productService.getProducts()
			.subscribe((products:Product[])=>{
				this.products = products;
			})
	}
}