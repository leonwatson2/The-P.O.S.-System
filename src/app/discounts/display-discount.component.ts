import { Component, Input } from '@angular/core';
import { Discount } from '../classes';

@Component({
	selector: 'display-discount',
	template: `
	<div *ngIf="discount">
		{{discount.name}} - <span *ngIf="!discount.isPercentage()">$</span> 

		{{discount.value}}<span *ngIf="discount.isPercentage()">%</span> off
	</div>
			
			`,
})

export class DisplayDiscountComponent {
	@Input() discount:Discount;
}
