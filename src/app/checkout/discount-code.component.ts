import { Component, Output, EventEmitter } from '@angular/core';
import { Discount } from '../classes';



@Component({
	selector: 'discount-code',
	template: `
			<div
				
				class="list-group-item discount-code">
				<div class="input-group">
				<label for="discount-code">Discount Code</label>
				<input 
					class="form-control" 
					type="text" 
					name="discount-code" 
					[(ngModel)]="discountCodeString"
				/>

				<button
					class="btn btn-primary"
					(click)="applyDiscount()"
				>Apply Discount</button>

				</div>

						</div>
			`,

})

export class DiscountCodeComponent {
	@Output() discount = new EventEmitter();

	discountCodeString:String = "";
	discountCode:Discount = new Discount("50off", 2);


	applyDiscount(){
		if(this.discountCodeString == this.discountCode.name){
			this.discount.emit({discountCode: this.discountCode});
		}
	}
	
}
