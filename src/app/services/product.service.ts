/*
*	Product Service.ts
*	Sends and returns information about products
*	to and from the database.
*/

import { Injectable} from '@angular/core';
import { Http, Headers} from '@angular/http';
import { Observable, Observer} from 'rxjs/Rx';
import { Product, iProduct } from '../classes';
import { eAppErrors } from '../enums';

export interface iProductResponse{
	product?:Product | iProduct
	error?:eAppErrors
}

@Injectable()

export class ProductService{
	constructor(private http:Http){}
	
	getProducts():Observable<Product[]>{
		return Observable.of(this.tempProducts);
	}
  
  addProduct(product:iProduct):Observable<iProductResponse>{
    if(!this.isProduct(product)){
		let newProduct = this.createProduct(product);
		if(newProduct.isValidValue()){
			this.tempProducts.push(newProduct);
			return Observable.of({product:newProduct});
		}
		else{
			return Observable.create((observer:Observer<iProductResponse>)=>{
				return observer.error({error:eAppErrors.INVALID});
			});
		}
	}
	else{
		return Observable.create((observer:Observer<iProductResponse>)=>{
			return observer.error({error:eAppErrors.DUPLICATE});
		});
	}
  }

	createProduct(product:iProduct):Product{
		return new Product(
				Math.round(Math.random()*10000000000),
				product.name,
                product.cost,
                product.amount);
	}
	
	updateProduct(oldProduct:Product, newProduct:iProduct):Observable<iProductResponse>{
		let index = this.tempProducts.findIndex((d)=>{
			if(d.id == oldProduct.id)
				return true;
		});
		let newD = this.createProduct(newProduct);
		if(!newD.isValidValue()){
			return Observable.create((observer:Observer<iProductResponse>)=>{
				return observer.error(eAppErrors.INVALID);
			});
		}
		else if(index > -1){
			this.tempProducts[index] = new Product(
								oldProduct.id, 
								newProduct.name,
								newProduct.cost,
								newProduct.amount);
			return Observable.of({product:this.tempProducts[index]});
		}
		else if(index == -1){
			return Observable.create((observer:Observer<iProductResponse>)=>{
				return observer.error(eAppErrors.NOTFOUND);
			});
		}
	}
	
	isProduct(product:iProduct):Boolean{
    let bool = this.tempProducts.findIndex((d)=>{
		return d.name == product.name
	});
    return bool >= 0;
  }

	tempProducts:Product[] = [
		new Product(32,"Leon",1000),
		new Product(32,"Rey",4000),
		new Product(32,"Rey",3000),
		new Product(32,"Chris",2000)
	];

}