import { Component, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../classes';

@Component({
	selector: 'library',
	template: `
			<h2>Library</h2>
			<input
				class="form-control" 
				[(ngModel)]="search"
				type="search" 
				placeholder="Search"/>
				<div class="product-list list-group">
					<a 
					*ngFor="let product of products | find:{key:'name', value:search}"
					(click)="addItemToCart(product)"
					class="list-group-item"
					
					[title]="product.amount">

						{{product.name}} - {{product.cost|currency:'usd':true}}

					</a>
				</div>
			`,
	styleUrls:['css/checkout.css'],
			
})

export class LibraryComponent {
	@Output('addToCart') addCartEmitter = new EventEmitter();
	search:String = ""
	products:Product[] = []
	constructor(private productService:ProductService){}

	ngOnInit(){
		this.productService.getProducts().subscribe((products:Product[])=>{
			this.products = products;
		});
	}

	addItemToCart(product:Product){
		this.addCartEmitter.emit(product);
		this.search = "";
	}
}
