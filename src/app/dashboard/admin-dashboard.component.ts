/*
*	admin-dashboard.component.ts
*	Admin dashboard component that is displayed to Adminastrators when they log in.
*	The Admin options are:
*		-Add/Edit/Search Products
*		-Add/Edit/Search Employee
*		
*/

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Administrator, Product, iMenuOption } from '../classes';


enum eUpdateType{
  ADD , 
  UPDATE,
  REMOVE
}

@Component({
	selector: 'admin-dashboard',
	template: `
				<h2>Admin Dashboard</h2>
				<button 
					*ngFor="let option of options">
					{{option.name}}:{{option.urlPath}}
					</button>
			`,	
})

export class AdminDashboardComponent {
		@Input() administrator:Administrator;
		@Output() updateProducts = new EventEmitter();


		tempProduct = new Product();

		options:iMenuOption[] = [
			{
				name:"Add Product Profile",
				urlPath:"/products/add"
			},
			{
				name:"Edit Product Profile",
				urlPath:"/products/edit"
			},
			{
				name:"Search Products",
				urlPath:"/products/search"
			},
			{
				name:"Add Employee Profile",
				urlPath:"/employees/add"
			},
			{
				name:"Edit Employee Profile",
				urlPath:"/employees/edit"
			},
			{
				name:"Search Employee Profile",
				urlPath:"/employees/search"
			}]

		addProduct(){
			let modifiedProduct = {
				updateType: eUpdateType.ADD,
				product:this.tempProduct
			}


			this.updateProducts.emit(modifiedProduct);
		}

		
}
