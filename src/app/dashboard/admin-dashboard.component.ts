import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../classes';


enum eUpdateType{
  ADD , 
  UPDATE,
  REMOVE
}

@Component({
	selector: 'admin-dashboard',
	template: `
				<h2>Admin Dashboard</h2>
				<input type="text" [(ngModel)]="tempProduct.name" />
				<input type="text" [(ngModel)]="tempProduct.cost" />
				<input type="text" [(ngModel)]="tempProduct.amount" />
				<button (click)="addProduct()" > Add Product</button>

			`,	
})

export class AdminDashboardComponent {
		@Output() updateProducts = new EventEmitter();

		tempProduct = new Product();
		uT = eUpdateType;

		addProduct(){
			let modifiedProduct = {
				updateType: eUpdateType.ADD,
				product:this.tempProduct
			}


			this.updateProducts.emit(modifiedProduct);
		}

		
}
