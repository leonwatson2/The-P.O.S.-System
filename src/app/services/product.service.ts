/*
*	Product Service.ts
*	Sends and returns information about products
*	to and from the database.
*/

import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Product } from '../classes';


declare var window:any;

@Injectable()

export class ProductService{

	getProducts():Promise<Product[]>{

		return Promise.resolve(this.tempProducts);
	}


	verifyProductCredentials(employee:Product):Product{
		
	

		return employee;
	}

	tempProducts:Product[] = [
		new Product(32,"Leon",1000)
		new Product(32,"Rey",4000)
		new Product(32,"Rey",3000)
		new Product(32,"Chris",2000)
	];
}