import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Cart, Discount } from '../classes';

@Component({
	selector: 'current-sale',
	template: `
	
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
	
			`,
	styleUrls:['css/checkout.css', '../solar-bootstrap-theme.min.css'],

})

export class CurrentSaleComponent {
	@Input()cart:Cart = new Cart(1, [], 0, 12, null);
	@Output('applyDiscount') discountEmitter = new EventEmitter();
	@Output('charge')chargeEmitter = new EventEmitter();
	
	applyDiscount(discount:Discount){
		this.discountEmitter.emit(discount);
	}
	removeFromCart(){
		
	}
	charge(){
		this.chargeEmitter.emit()
	}
}
