import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../classes';
import { ProductService } from '../services/product.service';

enum eUpdateType{
	ADD,
	UPDATE
}

@Component({
	selector: 'inventory',
	template:`
		<h2>Inventory</h2>
		<ul class="inventory">
			<li *ngFor="let product of products">
			</li>
		</ul>
		<div *ngIf="selectedItem">
			<div>
				<label>Product Name: </label>
				<input type='text' [(ngModel)]='tempProduct.name' placeholder="Product Name"/>
			</div>
			<div>
				<label>Product Cost: </label>
				<input type='text' [(ngModel)]='tempProduct.cost' placeholder="Cost"/>
			</div>
			<div>
				<label>Product Quantity: </label>
				<input type='text' [(ngModel)]='tempProduct.amount' placeholder="Number of Product"/>
			</div>
			<button (click="addProduct()">Add Product</button>
			<button (click="modifyProduct()">Edit Product</button>
		</div>
	`
})

export class AddProductComponent { 
	@Input() product:Product;
	@Output() updateProduct = new EventEmitter();

	tempProduct = new Product();
	updateVar = eUpdateType;
	
	constructor(private productService: ProductService) { }
	
	ngOnInit() {
		this.productService.getProducts().then(tempProduct => this.tempProducts = tempProducts)
		this.productService.getProducts().then(tempProducts => this.tempProducts = tempProducts)
	}

	addProduct(){
		let modifiedProduct = {
			updateType: eUpdateType.ADD,
			product:this.tempProduct
		}

		this.updateProduct.emit(modifiedProduct);
	}

}