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
<<<<<<< HEAD
	styleUrls:['../styles/style.css']
	
=======

	// styleUrls:['../discounts/discounts.css', '../solar-bootstrap-theme.min.css']

>>>>>>> refs/remotes/vlw0052/master
})

export class AddProductComponent { 
	eFormType:typeof eFormType = eFormType;
	
	constructor(){}
	
	ngOnInit() {
	}
	
	ngOnDestroy(){
	}

}