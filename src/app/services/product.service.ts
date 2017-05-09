/*
*	Product Service.ts
*	Sends and returns information about products
*	to and from the database.
*/

import { Injectable} from '@angular/core';
import { Http, Headers} from '@angular/http';
import { Observable, Observer} from 'rxjs/Rx';
import { Product, iProduct } from '../classes';
import { AddItemErrors, eAppErrors } from '../enums';

export interface iProductResponse{
	product?: Product | iProduct
	error?: AddItemErrors
}

@Injectable()

export class ProductService{
	constructor(private http:Http){}
	
	getProducts():Observable<Product[]>{
		return Observable.of(this.tempProducts);
	}
  
  addProduct(product:iProduct):Observable<iProductResponse>{
      let newProduct = new Product(
				Math.round(Math.random()*700000000),
				product.name,
                product.cost,
                product.amount);
      
      //Check if product with that name exist
      if(this.doesProductExist(newProduct)){
        return Observable.create((observer:Observer<iProductResponse>)=>{
          return observer.error({error:AddItemErrors.DUPLICATE});
        });
      }
      else if(!newProduct.isValidValue())
        return Observable.create((observer:Observer<Product>)=>{
          return observer.error({error:AddItemErrors.INVALID});
        });
      else{
        this.tempProducts.push(newProduct);
        return Observable.of({product:newProduct});
      }
  }
	
	updateProduct(oldProduct:Product, newProduct:iProduct):Observable<iProductResponse>{
		let indexOfProduct = this.tempProducts.findIndex((d)=>{return d.id == oldProduct.id});
	let nProduct = new Product(null, newProduct.name, newProduct.cost, newProduct.amount);
		if(indexOfProduct == -1){
			return Observable.create((observer:Observer<Product>)=>{
				return observer.error({error:eAppErrors.NOTFOUND})
			})
		}
		else if(!nProduct.isValidValue()){
			return Observable.create((observer:Observer<Product>)=>{
				return observer.error({error:eAppErrors.INVALID})
			})
		}
		else{
			console.log(newProduct);
			this.tempProducts[indexOfProduct].updateProduct(newProduct)
		}
		return Observable.of({product:newProduct});
	}
	
	doesProductExist(product:Product):Boolean{
    let prodNames:String[] = this.tempProducts.map((d)=>d.name);
    let doesExist:Boolean = prodNames.includes(product.name);
    return doesExist;
  }

	tempProducts:Product[] = [
		new Product(32,"Leon",1000),
		new Product(32,"Rey",4000),
		new Product(32,"Rey",3000),
		new Product(32,"Chris",2000)
	];

}