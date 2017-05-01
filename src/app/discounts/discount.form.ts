export const discountForm = `
			<form [formGroup]="discountForm" class="discount-form" (ngSubmit)="submitForm(discountForm.value)">
				<input type="text"
					(focus)="discountForm.controls['name'].setValue('')" 
					placeholder="Discount Name"
					[ngClass]="{'has-error':!discountForm.controls['name'].valid && discountForm.controls['name'].touched}"
					[formControl]="discountForm.controls['name']"/>
				<input type="number" 
					(focus)="discountForm.controls['value'].setValue('')" 
					placeholder="Amount off"
					min=0
					[ngClass]="{'has-error':!discountForm.controls['value'].valid && discountForm.controls['value'].touched}"
					[formControl]="discountForm.controls['value']"/>
				<div>
					<label for="isPerc">Is Percentage</label>
					<input type="checkbox" name="isPercentage" id="isPerc" [formControl]="discountForm.controls['isPercentage']"/>
				</div>
				<button type="submit" class="btn btn-success" [disabled]="!discountForm.valid"><span>{{formType}}</span> Discount</button>
				
				<div [ngSwitch]="error">
					<div 
						*ngSwitchCase="errorTypes.DUPLICATE">
						Discount name already exist
					</div>
					<div 
						*ngSwitchCase="errorTypes.INVALID">
						Discount value
						<span *ngIf="!discountForm.controls['isPercentage'].value"> must be positive. </span>
						<span *ngIf="discountForm.controls['isPercentage'].value">must be between 0 and 100 if a percentage type of discount.</span>
					</div>
				</div>
			</form>`