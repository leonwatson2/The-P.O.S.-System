/*
*	associate-dashboard.component.ts
*	Associate dashboard component that is displayed to Associate when they log in.
*	The Associate options are:
*		-Checkout
*		-Search Products
*		-Add/Edit/Search Customer Profile
*		
*/

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Associate, iMenuOption } from '../classes';
import { associateMenuOptions } from '../routes';


import { EmployeeService } from '../services/employee.service';

@Component({
	selector: 'associate-dashboard',
	template: `
	
				<h2>Associate Dashboard</h2>
				<router-outlet></router-outlet>
				<div class="dashboard-menu">
					<a *ngFor="let option of options"
						>
						<button 
						[routerLink]="option.urlPath"
						class="btn btn-primary"
						>
						{{option.name}}
						</button>
					</a>
				</div>

			`,
	styleUrls:['./dashboard.css']

})

export class AssociateDashboardComponent {
	associate:Associate;
	options:iMenuOption[] = [];
	constructor(private employeeService:EmployeeService){
	}
	
	ngOnInit(){
		this.associate = this.employeeService.currentEmployee;
		this.options = associateMenuOptions;
	}
	details:String;
	

	
}
