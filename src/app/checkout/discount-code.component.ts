import { Component,Input,  Output, EventEmitter } from '@angular/core';
import { Discount } from '../classes';

import { DiscountService } from '../services/discount.service';
import { eAppErrors } from '../enums';

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
				</div>
				<button
					class="btn btn-primary"
					(click)="applyDiscount()"
				>Apply Discount</button>
				
				<div [ngSwitch]="error">
					<div *ngSwitchCase="eAppErrors.NOTFOUND">
						Discount Not Found
					</div>
					<div *ngSwitchCase="eAppErrors.DUPLICATE">
						Discount Not Found
					</div>
				</div>
			</div>
			`,

})

export class DiscountCodeComponent {
	@Input('discountError') error:eAppErrors = null;
	@Output() discount = new EventEmitter();

	discountCodeString:string = "";
	eAppErrors = eAppErrors

	constructor(private discountService:DiscountService){}


	applyDiscount(){
		this.discountService
			.getDiscountByName(this.discountCodeString)
			.subscribe((discountRes)=>{
				let appliedDiscount = discountRes.discount;
				this.discount.emit(appliedDiscount);
			},(errorRes)=>{

				this.error = errorRes.error;
			});

		
	}
	
}
