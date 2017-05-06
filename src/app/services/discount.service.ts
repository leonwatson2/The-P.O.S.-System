/*
*	discount.service.ts
*	Author: Leon	
*	This ends and returns information about 
*	the discounts to and from the database.
*/

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, Observer } from 'rxjs/Rx';

import { iDiscount, Discount } from '../classes';
import { eAppErrors } from '../enums';

@Injectable()

export class DiscountService{

	constructor(private http:Http){}

	getDiscounts():Observable<Discount[]>{
		return Observable.of(this.tempDiscounts);

	}

	tempDiscounts:Discount[] = [
		new Discount(0, "Name", 304, false),
		new Discount(2, "Name2", 304, false)

	]
}