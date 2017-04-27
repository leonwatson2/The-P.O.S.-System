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
		new Product()
	];
}