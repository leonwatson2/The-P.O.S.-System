/*
*	admin-dashboard.component.ts
*	Admin dashboard component that is displayed to Adminastrators when they log in.
*	The Admin options are:
*		-Add/Edit/Search Products
*		-Add/Edit/Search Employee
*		
*/

import { Component, Input } from '@angular/core';
import { Associate, Administrator, Product, iMenuOption } from '../classes';

import { EmployeeService } from '../services/employee.service';

import { adminMenuOptions } from '../routes';

@Component({
	selector: 'admin-dashboard',
	template: `
				<h2>Admin Dashboard</h2>
				<router-outlet></router-outlet>
				<div class="dashboard-menu">
				<a *ngFor="let option of options"
					disabled="true">
					<button 
					class="btn btn-primary"
					[routerLink]="option.urlPath"

					>
					{{option.name}}
					</button>
				</a>
				</div>
			`,
	styleUrls:['./dashboard.css']


})

export class AdminDashboardComponent {
		//@Output() updateProducts = new EventEmitter();
		administrator:Administrator = null;
		options:iMenuOption[] = []
		constructor(private employeeService:EmployeeService){
			
		}

		ngOnInit(){
			this.administrator = this.employeeService.currentEmployee;
			this.options = adminMenuOptions;
		}
		/*tempProduct = new Product();

		

		addProduct(){
			let modifiedProduct = {
				updateType: eUpdateType.ADD,
				product:this.tempProduct
			}


			this.updateProducts.emit(modifiedProduct);
		}*/

		
}
