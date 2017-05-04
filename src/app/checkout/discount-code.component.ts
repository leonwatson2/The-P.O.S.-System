import { Component, Output, EventEmitter } from '@angular/core';
import { Discount } from '../classes';

import { DiscountService } from '../services/discount.service';


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
				<div [ngSwitch]="error">
					<div *ngSwitchCase="3">
						Discount Not Found
					</div>
				</div>
			</div>
			`,

})

export class DiscountCodeComponent {
	@Output() discount = new EventEmitter();

	discountCodeString:String = "";
	error:number;
	constructor(private discountService:DiscountService){}


	applyDiscount(){
		this.discountService
			.getDiscountByName(this.discountCodeString)
			.subscribe((discountRes)=>{
				let appliedDiscount = discountRes.discount;
				console.log(appliedDiscount);
				this.discount.emit(appliedDiscount);
			},(errorRes)=>{

				this.error = errorRes.error;
			});

		
	}
	
}
