import { Component } from '@angular/core';
import { eFormType } from '../enums';

@Component({
	selector: 'add-product',
	template:`
		<h2>Add Product</h2>
		<product-form [type]="eFormType.ADD"></product-form>
	`,
	styleUrls:['../styles/style.css']
})

export class AddProductComponent { 
	eFormType = eFormType;
}