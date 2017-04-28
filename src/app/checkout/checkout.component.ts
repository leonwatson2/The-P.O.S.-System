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
				
				<div id="library">
					<h2>Library</h2>
					<input
						class="form-control" 
						[(ngModel)]="search"
						type="search" 
						placeholder="Search"/>
						<div class="product-list list-group">
							<a 
							*ngFor="let product of products | find:{key:'name', value:search}"
							(click)="addItemToCart(product)"
							class="list-group-item"
							href="#"
							[title]="product.amount">
	
								{{product.name}} - {{product.cost|currency:'usd':true}}
	
							</a>
						</div>
				</div>

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
	search:String = ""

	nextId:number = 0;
	transactions:Transaction[] = [];

	constructor(private employeeService:EmployeeService){

	}
	ngOnInit(){
		
		this.associate = this.employeeService.currentEmployee;
		console.log(this.associate.name);
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
		this.search = "";
		this.amountPaid = 0;
	}
	//TODO:display products component
	products = [
  new Product(
    157, "Ohio", 182
  ),
  new Product(
    189, "South Carolina", 157
  ),
  new Product(
    88, "Kansas", 119
  ),
  new Product(
    256, "Minnesota", 176
  ),
  new Product(
    197, "Indiana", 169
  ),
  new Product( 0, "North Carolina", 24,

  ),
  new Product(
    284, "Louisiana", 182
  ),
  new Product(
    43, "Nevada", 185
  ),
  new Product(
    191, "Puerto Rico", 117
  ),
  new Product(
    72, "Texas", 138
  ),
  new Product( 219, "District Of Columbia", 79,),
  new Product(64, "Guam", 164),
  new Product( 4, "Utah", 19,),
  new Product(
    149, "Arizona", 186
  ),
  new Product(
    76, "Wyoming", 135
  ),
  new Product(
    242, "Virgin Islands", 160
  ),
  new Product( 103, "Iowa", 80),
  new Product(
    101, "Missouri", 165
  ),
  new Product( 152, "Vermont", 73,

  ),
  new Product(
    142, "North Dakota", 184
  ),
  new Product(
    30, "California", 200
  ),
  new Product( 287, "Federated States Of Micronesia", 48),
  new Product(
    64, "Hawaii", 169
  ),
  new Product( 67, "Illinois", 13),
  new Product(
    264, "Marshall Islands", 152
  ),
  new Product(
    273, "Pennsylvania", 137
  ),
  new Product(
    106, "Alabama", 165),
  new Product( 32, "Idaho", 95,

  ),
  new Product(
    9, "Michigan", 118),
  new Product( 121, "Oregon", 68),
  new Product( 68, "New York", 89),
  new Product( 246, "Massachusetts", 42),
  new Product( 107, "Florida", 8,
),
  new Product( 18, "American Samoa", 50),
  new Product( 234, "Montana", 95,

  ),
  new Product(
    17, "Palau", 134
  ),
  new Product(
    188, "Maryland", 180
  ),
  new Product(
    107, "South Dakota", 197),
  new Product( 216, "New Mexico", 94),
  new Product( 129, "Maine", 27),
  new Product( 142, "Virginia", 86),
  new Product(
    33, "Northern Mariana Islands", 138
  ),
  new Product(
    92, "Alaska", 114),
  new Product( 248, "Nebraska", 57
  ),
  new Product(
    26, "West Virginia", 139
  ),
  new Product(
    155, "Oklahoma", 176),
  new Product( 163, "Georgia", 88
  ),
  new Product(
    260, "New Hampshire", 164),
  new Product(
    122, "Tennessee", 176)
];
}
