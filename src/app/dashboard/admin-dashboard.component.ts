/*
*	admin-dashboard.component.ts
*	Admin dashboard component that is displayed to Adminastrators when they log in.
*	The Admin options are:
*		-Add/Edit/Search Products
*		-Add/Edit/Search Employee
*		
*/

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
				<button (click)="addProduct()" > Search Products</button>
				<button (click)="addProduct()" > Edit Products</button>
				<button (click)="addProduct()" > Add Product</button>
				<button (click)="addProduct()" > Search Employee</button>
				<button (click)="addProduct()" > Edit Employee</button>
				<button (click)="addProduct()" > Add Employee</button>
			`,	
})

export class AdminDashboardComponent {
		@Output() updateProducts = new EventEmitter();

		tempProduct = new Product();
		updateVar = eUpdateType;

		addProduct(){
			let modifiedProduct = {
				updateType: eUpdateType.ADD,
				product:this.tempProduct
			}


			this.updateProducts.emit(modifiedProduct);
		}

		
}
