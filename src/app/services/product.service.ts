/*
*	Product Service.ts
*	Sends and returns information about products
*	to and from the database.
*/

import { Injectable} from '@angular/core';
import { Http, Headers} from '@angular/http';
import { Observable, Observer} from 'rxjs/Rx';

import { Product, Discount, iDiscount, iProduct } from '../classes';
import { AddItemErrors, eAppErrors } from '../enums';




export interface iProductResponse{
	product?: Product | iProduct
	error?:AddItemErrors
}

@Injectable()

export class ProductService{

	constructor(private http:Http){}
  
  getProducts():Observable<Product[]>{

    return Observable.of(this.products);
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
          return observer.error({error:AddItemErrors.DUPLICATE});
        });
      }
      else if(!newProduct.isValidValue())
        return Observable.create((observer:Observer<Product>)=>{
          return observer.error({error:AddItemErrors.INVALID});
        });
      else{
        this.products.push(newProduct);
        return Observable.of({product:newProduct});
      }
  }

  doesProductExist(discount:Product):Boolean{
    let disNames:String[] = this.tempProducts.map((d)=>d.name);
    let doesExist:Boolean = disNames.includes(discount.name);
    return doesExist;
  }
	
  verifyProductCredentials(employee:Product):Product{
		
		return employee;
	}

  tempProducts:Product[] = [
    new Product(32,"Leon",1000),
    new Product(32,"Rey",4000),
    new Product(32,"Rey",3000),
    new Product(32,"Chris",2000)
  ];

 

  //TODO:display products component
  products = [];


}