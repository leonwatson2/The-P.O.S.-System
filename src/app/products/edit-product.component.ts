import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../classes';

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
				<input type='text' [(ngModel)]='tempProduct.amount' placeholder="Number of Items"/>
			</div>
			<button (click="modifyProduct()">Edit Product</button>
		</div>
	`
})

export class EditProductComponent {
	@Input() product:Product;
	@Output() updateProduct = new EventEmitter();
	
	tempProduct = new Product();
	updateVar = eUpdateType;
	
	modifyProduct(){
		let modifiedProduct = {
			updateType: eUpdateType.UPDATE,
			product:this.tempProduct
	}

	this.updateProduct.emit(modifiedProduct);
	}

}