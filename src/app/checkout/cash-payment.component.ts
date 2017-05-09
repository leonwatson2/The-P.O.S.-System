import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
	selector: 'cash-payment',
	template: `
			<h3>Sale {{total | currency:'usd':true}}</h3>
			<form [formGroup]="paymentForm" (ngSubmit)="processPayment(paymentForm.value)">
				<div class="input-group">
					<span class="input-group-addon" id="sizing-addon1">$</span>
					<input 
						class="form-control"
						name="payment" 
						type="number" 
						placeholder="100" 
						[formControl]="paymentForm.controls['amountPaid']"
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
			`,
			styleUrls:['css/checkout.css'],
			
})

export class CashPaymentComponent {
	@Input()total:number;
	@Output('processPayment') paymentEmitter = new EventEmitter(); 
	
	paymentForm:FormGroup;

	constructor(fb:FormBuilder){
		this.paymentForm = fb.group({
			'amountPaid':[null, Validators.required]
		});
	}

	processPayment(values:{amountPaid:number}){
		if(values.amountPaid > this.total)
			this.paymentEmitter.emit(values.amountPaid);

	}
}
