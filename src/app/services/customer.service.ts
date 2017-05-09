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
	customer?:CustomerProfile | iCustomer
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

	getCustomerByEmail(customerEmail:String):Observable<iCustomerResponse>{

		let indexOfCustomer = this.tempCustomers.findIndex((cus)=>{return cus.email == customerEmail});
		if(indexOfCustomer >= 0){
			return Observable.of({customer:this.tempCustomers[indexOfCustomer]});
		}else{
			return Observable.create((observer:Observer<iCustomerResponse>)=>{
				return observer.error({error:eAppErrors.NOTFOUND});
			})
		}
	}

	updateCustomer(oldCustomer:CustomerProfile, newCustomer:iCustomer):Observable<iCustomerResponse>{
		let indexOfCustomer = this.tempCustomers.findIndex((c)=>{return c.email == oldCustomer.email});
		let nCustomer = new CustomerProfile(
											newCustomer.name,
											newCustomer.associatename,
											newCustomer.managename,
											newCustomer.email,
											newCustomer.phone,
											newCustomer.receipts
											);
		if(indexOfCustomer == -1){
			return Observable.create((observer:Observer<CustomerProfile>)=>{
				return observer.error({error:eAppErrors.NOTFOUND})
			})
		}else if(!nCustomer.isValidPhone()){
			return Observable.create((observer:Observer<CustomerProfile>)=>{
				return observer.error({error:eAppErrors.INVALID})
			})
		}else{
			console.log(newCustomer);
			this.tempCustomers[indexOfCustomer].updateCustomer(newCustomer)
		}
		return Observable.of({customer:newCustomer});
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
		new CustomerProfile("Jimmy Ray", "Chris", "Chris", "jim@email.com", 8306139999),
		new CustomerProfile("Bobby Blue", "Chris", "Chris", "bob@email.com", 8306305555),
	]
}