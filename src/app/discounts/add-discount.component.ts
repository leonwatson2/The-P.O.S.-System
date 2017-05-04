import { Component } from '@angular/core';
import { Discount, iDiscount } from '../classes';
import { Subject, Observable } from 'rxjs';
import { eAppErrors, eFormType } from '../enums';

@Component({
	selector: 'add-discount',
	template: `
			<h2>Add Discount</h2>
			<discount-form [type]="eFormType.ADD" ></discount-form>

			<hr />
			`,
})

export class AddDiscountComponent {
	eFormType:typeof eFormType = eFormType;


	constructor(){}

	ngOnInit(){
		
	}

	ngOnDestroy(){
	}

}
