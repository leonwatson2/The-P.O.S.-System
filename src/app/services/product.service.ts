/*
*	Product Service.ts
*	Sends and returns information about products
*	to and from the database.
*/

import { Injectable} from '@angular/core';
import { Http, Headers} from '@angular/http';
import { Observable, Observer} from 'rxjs/Rx';
<<<<<<< HEAD
import { Product, iProduct } from '../classes';
import { AddItemErrors, eAppErrors } from '../enums';

export interface iProductResponse{
	product?: Product | iProduct
	error?: AddItemErrors
=======

import { Product, Discount, iDiscount, iProduct } from '../classes';
import { eAppErrors } from '../enums';


export interface iDiscountResponse{
	discount?:Discount | iDiscount
	error?:eAppErrors
}

export interface iProductResponse{
	product?: Product | iProduct
	error?:eAppErrors
>>>>>>> refs/remotes/vlw0052/master
}

@Injectable()

export class ProductService{
	constructor(private http:Http){}
	
<<<<<<< HEAD
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
=======
	/*getProductsByName(productName:String):Observable<iProductResponse>{
		let indexOfProduct = this.tempProducts.findIndex((prod)=>{return
		prod.name == productName});
		if(indexOfProduct >= 0){
			return Observable.of({product:this.tempProducts[indexOfProduct]});
		}
		else{
			return Observable.create((observer:Observer<iProductResponse>)=>{
				return observer.error({error:eAppErrors.NOTFOUND});
				})
		}
	}*/

	verifyProductCredentials(employee:Product):Product{
		
	

		return employee;
	}

  addProduct(discount:iProduct):Observable<iProductResponse>{
  			let newProduct = new Product(
  								Math.round(Math.random()*700000000),
  								discount.name,
  								discount.cost,
  								discount.amount);
        new Product()
  			
  			//Check if discount with that name exist
  			if(this.doesProductExist(newProduct)){
  				return Observable.create((observer:Observer<iProductResponse>)=>{
  					return observer.error({error:eAppErrors.DUPLICATE});
  				});
  			}
  			else if(!newProduct.isValidValue())
  				return Observable.create((observer:Observer<Product>)=>{
  					return observer.error({error:eAppErrors.INVALID});
  				});
  			else{
  				this.products.push(newProduct);
  				return Observable.of({product:newProduct});
  			}
  	}
>>>>>>> refs/remotes/vlw0052/master
	
	updateProduct(oldProduct:Product, newProduct:iProduct):Observable<iProductResponse>{
		let indexOfProduct = this.tempProducts.findIndex((d)=>{return d.id == oldProduct.id});
	let nProduct = new Product(null, newProduct.name, newProduct.cost, newProduct.amount);
		if(indexOfProduct == -1){
			return Observable.create((observer:Observer<Product>)=>{
<<<<<<< HEAD
				return observer.error({error:eAppErrors.NOTFOUND})
			})
		}
		else if(!nProduct.isValidValue()){
			return Observable.create((observer:Observer<Product>)=>{
=======
				return observer.error({error:eAppErrors.INVALID})
			})
		}
		else if(!nProduct.isValidValue()){
			return Observable.create((observer:Observer<Discount>)=>{
>>>>>>> refs/remotes/vlw0052/master
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
<<<<<<< HEAD
=======
	
>>>>>>> refs/remotes/vlw0052/master

	tempProducts:Product[] = [
		new Product(32,"Leon",1000),
		new Product(32,"Rey",4000),
		new Product(32,"Rey",3000),
		new Product(32,"Chris",2000)
	];

}