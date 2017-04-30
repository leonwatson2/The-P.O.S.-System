/*
*	Product Service.ts
*	Sends and returns information about products
*	to and from the database.
*/

import { Injectable} from '@angular/core';
import { Http, Headers} from '@angular/http';
import { Observable, Observer} from 'rxjs/Rx';
import { Product, Discount, iDiscount } from '../classes';
import { AddItemErrors, EditItemErrors } from '../errors';

export interface iDiscountResponse{
	discount?:Discount | iDiscount
	error?:AddItemErrors
}

@Injectable()

export class ProductService{

	constructor(private http:Http){}
	getProducts():Observable<Product[]>{

		return Observable.of(this.tempProducts);
	}

	getDiscounts():Observable<Discount[]>{

		return Observable.of(this.tempDiscounts).delay(2000);
	}

	verifyProductCredentials(employee:Product):Product{
		
	

		return employee;
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

	updateDiscount(oldDiscount:Discount, newDiscount:iDiscount):Observable<iDiscountResponse>{
		let indexOfDiscount = this.tempDiscounts.findIndex((d)=>{return d.id == oldDiscount.id});
		if(indexOfDiscount == -1){
			return Observable.create((observer:Observer<Discount>)=>{
				return observer.error({error:EditItemErrors.NOTFOUND})
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

	tempProducts:Product[] = [
		new Product(32,"Leon",1000),
		new Product(32,"Rey",4000),
		new Product(32,"Rey",3000),
		new Product(32,"Chris",2000)
	];

	tempDiscounts:Discount[] = [
		new Discount(121,"PAPA50", 30, true),
		new Discount(122,"PAPA60", 400),
		new Discount(123,"PAPA70", 500),
	];




}