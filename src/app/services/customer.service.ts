/*
*	customer.service.ts
*	Author: Chris Beasley
*	This sends and returns information about
*	the customers to and from the database.
*/

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, Observer } from 'rxjs/Rx';

import { iCustomer, CustomerProfile } from '../classes';
import { eAppErrors } from '../enums';

export interface iCustomerResponse{
	customer?:CustomerProfile
	error?:eAppErrors
}

@Injectable()

export class CustomerService{

	constructor(private http:Http){}

	getCustomers():Observable<CustomerProfile[]>{
		return Observable.of(this.tempCustomers);
	}

	// Adds customer to array.
	// Sets error if value is not valid or a duplicate.
	addCustomer(customer:iCustomer):Observable<iCustomerResponse>{

		if(!this.isCustomer(customer)){
			let newCustomer = this.createCustomer(customer);
			if(newCustomer.isValidPhone()){	
				this.tempCustomers.push(newCustomer);
				return Observable.of({customer:newCustomer})

			} else{
				return Observable.create((observer:Observer<iCustomerResponse>)=>{
					return observer.error({error:eAppErrors.INVALID});
				});
			}
		}
		else{
			return Observable.create((observer:Observer<iCustomerResponse>)=>{
				return observer.error({error:eAppErrors.DUPLICATE});
			});
		}
	}

	createCustomer(customer:iCustomer):CustomerProfile{
		return new CustomerProfile(
				customer.name,
				customer.associatename,
				customer.managename,
				customer.email,
				customer.phone,
				customer.receipts
			);
	}

	//Check if a customer with the same email exists.
	isCustomer(customer:iCustomer):Boolean{
		let bool = this.tempCustomers.findIndex((c)=>{
			return c.email == customer.email
		})
		return bool >= 0;
	}

	tempCustomers:CustomerProfile[] = [
		new CustomerProfile("Jimmy", "Chris", "Chris", "jim@", 8306139886),
		new CustomerProfile("Bobby", "Rey", "Chris", "bob@", 8306305555),
	]
}