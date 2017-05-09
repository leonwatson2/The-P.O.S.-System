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

export interface iDiscountResponse{
	discount?:Discount
	error?:eAppErrors
}

@Injectable()

export class DiscountService{

	constructor(private http:Http){}

	getDiscounts():Observable<Discount[]>{
		return Observable.of(this.tempDiscounts);

	}

	//addDiscount(discount:Discount)
	// Adds discount to array
	// Sets error if value is not valid or discount exists
	addDiscount(discount:iDiscount):Observable<iDiscountResponse>{
		
		if(!this.isDiscount(discount)){
			let newDiscount = this.createDiscount(discount);
			if(newDiscount.isValidValue()){
				this.tempDiscounts.push(newDiscount);
				return Observable.of({discount:newDiscount});

			}else{
				return Observable.create((observer:Observer<iDiscountResponse>)=>{
					return observer.error({error:eAppErrors.INVALID});
				});
			}
		}
		else{
			return Observable.create((observer:Observer<iDiscountResponse>)=>{
				return observer.error({error:eAppErrors.DUPLICATE});
			});
		}
	}

	//	createDiscount(discount:iDiscount)
	//Create Discount returns a Discount object 
	//	with a random id from the interface values passed in.
	createDiscount(discount:iDiscount):Discount{
		return new Discount(
				Math.floor(Math.random()*10000000000),
				discount.name,
				discount.value,
				discount.isPercentage
			);
	}

	// updateDiscount(oldDiscount:Discount, newDiscount:iDiscount)
	// finds the index of old discount by id in array
	// updates the value of old discount
	// sets error if the discount does not exist or values are not valid
	updateDiscount(oldDiscount:Discount, newDiscount:iDiscount):Observable<iDiscountResponse>{
		let index = this.tempDiscounts.findIndex((d)=>{
			if(d.id == oldDiscount.id)
				return true;
		});
		let newD = this.createDiscount(newDiscount);
		if(!newD.isValidValue()){
			return Observable.create((observer:Observer<iDiscountResponse>)=>{
				return observer.error(eAppErrors.INVALID);
			});
		}
		else if(index > -1){
			this.tempDiscounts[index] = new Discount(
								oldDiscount.id, 
								newDiscount.name,
								newDiscount.value,
								newDiscount.isPercentage);
			return Observable.of({discount:this.tempDiscounts[index]});
		}else if(index == -1){
			return Observable.create((observer:Observer<iDiscountResponse>)=>{
				return observer.error(eAppErrors.NOTFOUND);
			});
		}

	}

	//	isDiscount(discount:iDiscount):Boolean
	//Checks if a discount with the same name exist in discount array
	//	return true or false, using findIndex
	isDiscount(discount:iDiscount):Boolean{
		let bool = this.tempDiscounts.findIndex((d)=>{
			return d.name == discount.name
		})
		return bool >= 0;
	}
	tempDiscounts:Discount[] = [
		new Discount(0, "Name", 304, false),
		new Discount(2, "Name2", 304, false)

	]
}