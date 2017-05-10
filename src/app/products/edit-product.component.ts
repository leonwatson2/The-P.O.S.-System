import { Component } from '@angular/core';
import { Product } from '../classes';
import { ProductService } from '../services/product.service';
import { eFormType } from '../enums';

@Component({
	selector: 'edit-product',
	template:`
		<h2>Edit Products</h2>
			<div class="list-group">
				<div class="list-group-item search">
					<input type="text" [(ngModel)]="search" class="search" placeholder="Search for Products"/>
				</div>
				<div class="list-group-item" (click)="setChosenProduct(product)"
				*ngFor="let product of products | find:{key:'name', value:search}">
						{{product.name}}	<span>$</span>{{product.cost}}	<span>X</span>{{product.amount}}
				</div>
				
			</div>
			<product-form *ngIf="chosenProduct" [type]="eFormType.EDIT"
			[chosenProduct]="chosenProduct"
			(updated)="closeEdit()">
			</product-form>
	`,
	styleUrls:['../styles/style.css']
})

export class EditProductComponent{ 
	eFormType = eFormType;
	products:Product[] = [];
	chosenProduct:Product = null;
	search:string = "";

	constructor(private productService:ProductService){}

	ngOnInit() {
		this.updateProducts();
	}
	
	updateProducts(){
		this.productService.getProducts()
			.subscribe((products:Product[])=>{
				this.products = products;
			}, (err)=>{
					console.log(err);
			})
	}
	
	setChosenProduct(product:Product){
		this.chosenProduct = product;
	}
	
	closeEdit(){
		this.chosenProduct = null;
	}
	
}