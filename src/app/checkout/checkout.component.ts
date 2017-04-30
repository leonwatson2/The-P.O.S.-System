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
				
			<h2>CheckOut</h2>
			<div *ngIf="!chargeB" class="checkout">
				
				
					<library id="library" (addToCart)="addItemToCart($event)">
					</library>
				

				<div id="current-sale">
					<h3 *ngIf="cart.total <= 0">No Sale</h3>
					<h3 *ngIf="cart.total > 0">Current Sale {{cart.total | currency:'USD':true}}</h3>
					<div class="list-group">
						<div  
							*ngFor="let product of cart.items"
							
							class="list-group-item"
						>
							<div >
								<span>{{product.name}} x {{product.amount}}</span>
								<span
								class="glyphicon glyphicon-remove float-right" 
								(click)="removeFromCart(product)"></span>

							</div>
						</div>
						<discount-code 
							*ngIf="cart.total > 0" 
							(discount)="applyDiscount($event)"
						></discount-code>
					</div>

					<button 
						class="btn"
						*ngIf="cart.total > 0"
						(click)=charge()>
						Charge
					</button>
				</div>
			</div>
			<div *ngIf="chargeB" [ngSwitch]="paymentType">
				
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
					<h3>Sale {{cart.total | currency:'usd':true}}</h3>
					<form (ngSubmit)="processPayment()">
						<div class="input-group">
							<span class="input-group-addon" id="sizing-addon1">$</span>
							<input 
								class="form-control"
								name="payment" 
								type="number" 
								placeholder="100" 
								[(ngModel)]="amountPaid"
							/>
						</div>
						<button 
							id="payment"
							class="btn btn-info"
							name="submit" 
							type="submit">
							Process Payment
						</button>
					</form>
				</div>
					<div>
						<button
							*ngIf="(paymentType==paymentSection.cash || paymentType==paymentSection.select)" 
							class="btn"
							(click)="chargeB=false">back</button>
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
			styleUrls:['css/checkout.css', '../solar-bootstrap-theme.min.css'],
			
})

export class CheckOutComponent {
	@Output('processed') processedTransaction = new EventEmitter();
	associate:Associate = null;
	cart:Cart = new Cart(1, [], 0, 12, null);
	chargeB:boolean;
	amountPaid:number = null;
	paymentType:number;
	change:number = 0;
	paymentSection = ePaymentSection;

	nextId:number = 0;
	transactions:Transaction[] = [];

	constructor(private employeeService:EmployeeService){

	}
	ngOnInit(){
		
		this.employeeService
			.employeeObs
			.subscribe((employee)=>{
			this.associate = new Associate();
		});
	}
	getNewCart(){
		 return new Cart(1, [], 0, 12, null);
	}
	getCartInfo(){
		return JSON.stringify(this.cart);
	}//TODO:delete
	
	addItemToCart(product:Product){
		this.cart.addItem(product);
	}

	removeFromCart(product){
		console.log(product);
		let y = this.cart.removeItem(product);
		console.log(this.cart);
	}

	charge(){
		console.log(this.cart);
		this.paymentType = this.paymentSection.select;
		this.chargeB=true;
	}

	payByCash(){
		this.paymentType = this.paymentSection.cash;
	}
	processPayment(){
		if(this.amountPaid >= this.cart.total){
			this.change =  this.amountPaid - this.cart.total;
			this.paymentType = this.paymentSection.processed;
			let nTrans = new Transaction(this.nextId, 
							this.associate.name, 
							new Receipt(this.cart.items, this.cart.total, 
								1, 
								this.associate.name), 
					null);
			this.processedTransaction.emit(
				nTrans
				);
			this.transactions.push(nTrans);
			this.nextId++;
		}
	}

	applyDiscount(variable){
		let discount:Discount = variable.discountCode;
		this.cart.total -= discount.value;
	}

	newTransaction(){
		this.chargeB = false;
		this.cart =  this.getNewCart();
		
		this.amountPaid = 0;
	}
	
}
