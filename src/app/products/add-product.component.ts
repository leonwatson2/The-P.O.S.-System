import { Component } from '@angular/core';
import { Product, iProduct } from '../classes';
import{ Subject, Observable } from 'rxjs';
import { eAppErrors, eFormType } from '../enums';

@Component({
	selector: 'add-product',
	template:`
		<h2>Add Product</h2>
	<hr />
	`,
	styleUrls:['../styles/style.css']
})

export class AddProductComponent { 
	eFormType:typeof eFormType = eFormType;
	
	constructor(){}
	
	ngOnInit() {
	}
	
	ngOnDestroy(){
	}

}