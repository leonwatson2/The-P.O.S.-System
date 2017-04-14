import { Component, Input } from '@angular/core';

@Component({
	selector: 'transaction-history',
	template: `
			<h3>Transaction History</h3>
			<div class="list-group">
				<div
					*ngFor="let poop of transactions" 
					class="list-group-item">
					<div>Transaction Id: {{poop.id}}</div>
					<div>Date: 4/3/2102</div>
					<div *ngIf="poop.customerProfile">Customer Name: {{poop.customerProfile.name}}</div>
					<div>Associate Name: {{poop.associateName}}</div>
					<div>Reciept Id: {{poop.receipt.id}}</div>
					<div>Number of Items: {{poop.receipt.numberOfItems}}</div>
					<div>Total Cost: {{poop.receipt.totalCost}}</div>
				</div>
			</div>
			`,
			styleUrls:['css/transaction-history.css', '../solar-bootstrap-theme.min.css'],

})

export class TransactionHistoryComponent {
	@Input() transactions;

	ngOnInit(){
		console.log(this.transactions);
	}
}	
