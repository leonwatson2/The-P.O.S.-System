import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Cart, Product, Associate, Transaction, Receipt, Discount } from '../classes';
import { EmployeeService } from '../services/employee.service';

enum ePaymentSection{
	select,
	cash,
	card,	
	processed	
}

@Component({
	selector: 'checkout',
	template: `
				
			<h2>CheckOut - {{associate?.name}}</h2>
			<div *ngIf="!chargeCustomer" class="checkout">
				
				<library id="library" (addToCart)="addItemToCart($event)">
				</library>
				
				<current-sale id="current-sale" [cart]="cart" (applyDiscount)="applyDiscount($event)" (charge)="charge()">
				</current-sale>

			</div>
			<div *ngIf="chargeCustomer" [ngSwitch]="paymentType">
				
				<div *ngSwitchCase="paymentSection.select">
					<h3 >
					Paying with ...
					</h3>
					<div class="payment-types btn-group" >
						<button  class="btn btn-info" (click)="paymentType = paymentSection.cash">Cash</button>
						<button class="btn btn-primary" >Card</button>
					</div>
				</div>

				<div *ngSwitchCase="paymentSection.cash">
					<cash-payment [total]="cart.total" (processPayment)="processPayment($event)"></cash-payment>
				</div>
					<div>
						<button
							*ngIf="(paymentType==paymentSection.cash || paymentType==paymentSection.select)" 
							class="btn"
							(click)="chargeCustomer=false">back</button>
					</div>

				<div *ngSwitchCase="paymentSection.processed">
					<h3>Change: {{change | currency:'usd':true}}</h3>
					<form (ngSubmit)="newTransaction()">
					<button 
						(click)="newTransaction()"
						class="btn btn-primary"	
						id="processed"
					>New Transaction</button>
					</form>
				</div>
			</div>
			
			
			`,
			styleUrls:['css/checkout.css'],
			
})

export class CheckOutComponent {
	@Output('processed') processedTransaction = new EventEmitter();
	associate:Associate;
	cart:Cart = new Cart(1, [], 0, 12, null);
	chargeCustomer:boolean; //Set to true when customer is choosing payment and paying
	amountPaid:number = null; 
	paymentType:number;
	change:number = 0;
	paymentSection = ePaymentSection;

	nextId:number = 0;
	transactions:Transaction[] = [];

	constructor(private employeeService:EmployeeService){

	}
	ngOnInit(){
		this.associate = this.employeeService.currentEmployee;
		console.log(this.associate);
		

	}
	getNewCart(){
		 return new Cart(1, [], 0, 12, null);
	}
	getCartInfo(){
		return JSON.stringify(this.cart);
	}//TODO:delete
	
	addItemToCart(product:Product){
		console.log(this);
		this.cart.addItem(product);
	}

	removeFromCart(product){
		console.log(product);
		let y = this.cart.removeItem(product);
		console.log(this.cart);
	}

	charge(){
		this.paymentType = this.paymentSection.select;
		this.chargeCustomer=true;
	}

	payByCash(){
		this.paymentType = this.paymentSection.cash;
	}
	processPayment(amountPaid:number){
		if(amountPaid >= this.cart.total){
			this.change =  amountPaid - this.cart.total;
			this.paymentType = this.paymentSection.processed;
			console.log(this);
			let associateName = this.associate.name;
			let nTrans = new Transaction(this.nextId, 
							"this.associate.name", 
							new Receipt(this.cart.items, this.cart.total, 
								1, 
								"this.associate.name"), 
					null);
			this.processedTransaction.emit(
				nTrans
				);
			this.transactions.push(nTrans);
			this.nextId++;
		}
	}

	applyDiscount(newDiscount:Discount){
		this.cart.applyDiscount(newDiscount);
	}

	newTransaction(){
		this.chargeCustomer = false;
		this.cart =  this.getNewCart();
		
		
	}
	
}
