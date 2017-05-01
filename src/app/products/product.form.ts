export const productForm = `
	<form [formGroup]="productForm" class="discount-form" (ngSubmit)="submitForm(productForm.value)">
		<input type="text" (focus)="productForm.controls['name'].setValue('')" 
		placeholder="Product Name"
		[formControl]="productForm.controls['name']"/>
		<input type="number" (focus)="productForm.controls['cost'].setValue('')" 
		placeholder="Product Cost"
		[formControl]="productForm.controls['cost']"/>
		<input type="number" (focus)="productForm.controls['amount'].setValue('')" 
		placeholder="Product Quantity"
		[formControl]="productForm.controls['amount']"/>
		<button type="submit" [disabled]="!productForm.valid"><span>{{formType}}</span>Product</button>
	</form>