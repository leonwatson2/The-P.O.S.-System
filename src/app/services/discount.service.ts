/*
*	Product Service.ts
*	Sends and returns information about products
*	to and from the database.
*/

import { Injectable} from '@angular/core';
import { Http, Headers} from '@angular/http';
import { Observable, Observer} from 'rxjs/Rx';

import { Discount, iDiscount } from '../classes';
import { AddItemErrors, eAppErrors } from '../enums';

export interface iDiscountResponse{
	discount?:Discount | iDiscount
	error?:AddItemErrors
}

@Injectable()

export class DiscountService{

	constructor(private http:Http){}
	
	getDiscounts():Observable<Discount[]>{

		return Observable.of(this.tempDiscounts);
	}

	addDiscount(discount:iDiscount):Observable<iDiscountResponse>{
		let newDiscount = new Discount(
			Math.round(Math.random()*700000000),
			discount.name,
			discount.value,
			discount.isPercentage);

		//Check if discount with that name exist
		if(this.doesDiscountExist(newDiscount)){
			return Observable.create((observer:Observer<iDiscountResponse>)=>{
				return observer.error({error:AddItemErrors.DUPLICATE});
			});
		}
		else if(!newDiscount.isValidValue())
			return Observable.create((observer:Observer<Discount>)=>{
				return observer.error({error:AddItemErrors.INVALID});
			});
		else{
			this.tempDiscounts.push(newDiscount);
			return Observable.of({discount:newDiscount});
		}
	}

	getDiscountByName(discountName:String):Observable<iDiscountResponse>{

		let indexOfDiscount = this.tempDiscounts.findIndex((dis)=>{return dis.name == discountName});
		if(indexOfDiscount >= 0){
			return Observable.of({discount:this.tempDiscounts[indexOfDiscount]});
		}else{
			return Observable.create((observer:Observer<iDiscountResponse>)=>{
				return observer.error({error:eAppErrors.NOTFOUND});
			})
		}
	}

	updateDiscount(oldDiscount:Discount, newDiscount:iDiscount):Observable<iDiscountResponse>{
		let indexOfDiscount = this.tempDiscounts.findIndex((d)=>{return d.id == oldDiscount.id});
		let nDiscount = new Discount(null, newDiscount.name, newDiscount.value, newDiscount.isPercentage);
		if(indexOfDiscount == -1){
			return Observable.create((observer:Observer<Discount>)=>{
				return observer.error({error:eAppErrors.NOTFOUND})
			})
		}else if(!nDiscount.isValidValue()){
			return Observable.create((observer:Observer<Discount>)=>{
				return observer.error({error:eAppErrors.INVALID})
			})
		}else{
			console.log(newDiscount);
			this.tempDiscounts[indexOfDiscount].updateDiscount(newDiscount)

		}
		return Observable.of({discount:newDiscount});
	}

	doesDiscountExist(discount:Discount):Boolean{
		let disNames:String[] = this.tempDiscounts.map((d)=>d.name);
		let doesExist:Boolean = disNames.includes(discount.name);
		return doesExist;
	}

	tempDiscounts:Discount[] = [
	new Discount(121,"PAPA50", 30, true),
	new Discount(122,"PAPA60", 400),
	new Discount(123,"PAPA70", 500),
	];

}