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

@Component({
	selector: 'associate-dashboard',
	template: `
	
				<h2>Associate Dashboard</h2>
				<div>
					<button 
					*ngFor="let option of options">
					{{option.name}}:{{option.urlPath}}
					</button>
				</div>

			`,	
})

export class AssociateDashboardComponent {
	@Input() associate:Associate;
	
	details:String;
	options:iMenuOption[] = [
			{
				name:"Checkout",
				urlPath:"/checkout"
			},
			{
				name:"Search Products",
				urlPath:"/products/search"
			},
			{
				name:"Add Customer Profile",
				urlPath:"/customers/add"
			},
			{
				name:"Edit Customer Profile",
				urlPath:"/customers/edit"
			},
			{
				name:"Search Customer Profile",
				urlPath:"/customers/search"
			}]

	ngOnInit(){
		this.details = JSON.stringify(this.associate);
	}
}
