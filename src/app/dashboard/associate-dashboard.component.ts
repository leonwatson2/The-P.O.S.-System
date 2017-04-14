import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'associate-dashboard',
	template: `
				<h2>Associate Dashboard</h2>
			<button (click)="addProduct()" > Add Product</button>

			`,	
})

export class AssociateDashboardComponent {
		@Output() updateProducts = new EventEmitter();




}
