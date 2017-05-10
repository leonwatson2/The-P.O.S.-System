import { Component } from '@angular/core';
import { Product, iProduct } from '../classes';
import { ProductService } from '../services/product.service';
import { eAppErrors, eFormType } from '../enums';


@Component({
	selector: 'edit-product',
	template:`
		<h2>Update Product</h2>
			<div class="list-group">
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

export class EditProductComponent { 
	products:Product[] = null;
	chosenProduct:Product = null;
	search:String = "";
	eFormType:typeof eFormType = eFormType;
	
	constructor(private productService:ProductService){}

	ngOnInit() {
		this.productService
			.getProducts()
			.subscribe((products:Product[])=>{
				this.products = products;
			})
	}
	
	setChosenProduct(product:Product){
		this.chosenProduct = product;
	}
	
	closeEdit(){
		this.chosenProduct = null;
	}
	
}