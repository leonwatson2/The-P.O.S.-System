/*
*	manager-dashboard.component.ts
*	Manager dashboard component that is displayed to Manager when they log in.
*	The Manager options are:
*		-Checkout
*		-Add/Edit/Search Discount Codes
*		-Add/Edit/Search Employee
*		-Add/Edit/Search Customer Profile
*		
*/
import { Component, Input } from '@angular/core';
import { Manager, iMenuOption } from '../classes';
import { managerMenuOptions } from '../routes';


import { EmployeeService } from '../services/employee.service';


@Component({
	selector: 'manager-dashboard',
	template: `
		<h2>Manager Dashboard - {{manager?.name}}</h2>
		<div class="dashboard-menu">
		<a *ngFor="let option of options"
			>
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

export class ManagerDashboardComponent {
	manager:Manager = new Manager(90,"L","");
	options:iMenuOption[] = []
	constructor(private employeeService:EmployeeService){
		
	}

	ngOnInit(){
		this.setManager();
		this.options = managerMenuOptions;
	}
	setManager(){
		this.manager = this.employeeService.currentEmployee;
		
	}

	
	
	ngOnChanges(){
		

	}
}
