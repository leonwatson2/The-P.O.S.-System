import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Cart, Discount, Product } from '../classes';

@Component({
	selector: 'current-sale',
	template: `
	
			<h3 *ngIf="cart.total <= 0 && cart.items.length < 0">No Sale</h3>
			<h3 *ngIf="cart.total > 0 || cart.items.length > 0">Current Sale {{cart.total | currency:'USD':true}}</h3>
			<div class="list-group">
				<div class="list-group-item active" *ngIf="cart.items.length > 0"> Products </div>

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
				<div class="list-group-item active" *ngIf="cart.discounts.length > 0"> Discounts </div>
				<div class="list-group-item" *ngFor="let discount of cart.discounts">
					<display-discount [discount]="discount"></display-discount>
				</div>
				<discount-code 
					*ngIf="cart.total > 0" 
					[discountError]="discountError"
					(discount)="applyDiscount($event)"
				></discount-code>
			</div>

			<button 
				class="btn"
				*ngIf="cart.total > 0 || cart.items.length"
				(click)=charge()>
				Charge
			</button>
	
			`,
	styleUrls:['css/checkout.css'],

})

export class CurrentSaleComponent {
	@Input()cart:Cart = null;
	@Input()discountError;
	@Output('applyDiscount') discountEmitter = new EventEmitter();
	@Output('removeItem') removeEmitter = new EventEmitter();
	@Output('charge') chargeEmitter = new EventEmitter();
	
	applyDiscount(discount:Discount){
		this.discountEmitter.emit(discount);
	}
	removeFromCart(product:Product){
		product.amount = 1;
		this.removeEmitter.emit(product);
	}
	charge(){
		this.chargeEmitter.emit()
	}
}
