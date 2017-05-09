/*
*	Product Service.ts
*	Sends and returns information about products
*	to and from the database.
*/

import { Injectable} from '@angular/core';
import { Http, Headers} from '@angular/http';
import { Observable, Observer} from 'rxjs/Rx';

import { Product, Discount, iDiscount, iProduct } from '../classes';
import { eAppErrors } from '../enums';


export interface iDiscountResponse{
	discount?:Discount | iDiscount
	error?:eAppErrors
}

export interface iProductResponse{
	product?: Product | iProduct
	error?:eAppErrors
}

@Injectable()

export class ProductService{

	constructor(private http:Http){}
	getProducts():Observable<Product[]>{

		return Observable.of(this.products);
	}

	getDiscounts():Observable<Discount[]>{

		return Observable.of(this.tempDiscounts);
	}
	
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
	
	updateProduct(oldProduct:Product,
	newProduct:iProduct):Observable<iProductResponse>{
		let indexOfProduct = this.tempProducts.findIndex((d)=>{return d.id == oldProduct.id});
	let nProduct = new Product(null, newProduct.name, newProduct.cost, newProduct.amount);
		if(indexOfProduct == -1){
			return Observable.create((observer:Observer<Product>)=>{
				return observer.error({error:eAppErrors.INVALID})
			})
		}
		else if(!nProduct.isValidValue()){
			return Observable.create((observer:Observer<Discount>)=>{
				return observer.error({error:eAppErrors.INVALID})
			})
		}
		else{
			console.log(newProduct);
			this.tempProducts[indexOfProduct].updateProduct(newProduct)
		}
		return Observable.of({product:newProduct});
	}
	
	doesProductExist(discount:Product):Boolean{
    let disNames:String[] = this.tempProducts.map((d)=>d.name);
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

	//TODO:display products component
	products = [];


  nullProds= [
  new Product(
    157, "Ohio", 182
  ),
  new Product(
    189, "South Carolina", 157
  ),
  new Product(
    88, "Kansas", 119
  ),
  new Product(
    256, "Minnesota", 176
  ),
  new Product(
    197, "Indiana", 169
  ),
  new Product( 0, "North Carolina", 24,

  ),
  new Product(
    284, "Louisiana", 182
  ),
  new Product(
    43, "Nevada", 185
  ),
  new Product(
    191, "Puerto Rico", 117
  ),
  new Product(
    72, "Texas", 138
  ),
  new Product( 219, "District Of Columbia", 79,),
  new Product(64, "Guam", 164),
  new Product( 4, "Utah", 19,),
  new Product(
    149, "Arizona", 186
  ),
  new Product(
    76, "Wyoming", 135
  ),
  new Product(
    242, "Virgin Islands", 160
  ),
  new Product( 103, "Iowa", 80),
  new Product(
    101, "Missouri", 165
  ),
  new Product( 152, "Vermont", 73,

  ),
  new Product(
    142, "North Dakota", 184
  ),
  new Product(
    30, "California", 200
  ),
  new Product( 287, "Federated States Of Micronesia", 48),
  new Product(
    64, "Hawaii", 169
  ),
  new Product( 67, "Illinois", 13),
  new Product(
    264, "Marshall Islands", 152
  ),
  new Product(
    273, "Pennsylvania", 137
  ),
  new Product(
    106, "Alabama", 165),
  new Product( 32, "Idaho", 95,

  ),
  new Product(
    9, "Michigan", 118),
  new Product( 121, "Oregon", 68),
  new Product( 68, "New York", 89),
  new Product( 246, "Massachusetts", 42),
  new Product( 107, "Florida", 8,
),
  new Product( 18, "American Samoa", 50),
  new Product( 234, "Montana", 95,

  ),
  new Product(
    17, "Palau", 134
  ),
  new Product(
    188, "Maryland", 180
  ),
  new Product(
    107, "South Dakota", 197),
  new Product( 216, "New Mexico", 94),
  new Product( 129, "Maine", 27),
  new Product( 142, "Virginia", 86),
  new Product(
    33, "Northern Mariana Islands", 138
  ),
  new Product(
    92, "Alaska", 114),
  new Product( 248, "Nebraska", 57
  ),
  new Product(
    26, "West Virginia", 139
  ),
  new Product(
    155, "Oklahoma", 176),
  new Product( 163, "Georgia", 88
  ),
  new Product(
    260, "New Hampshire", 164),
  new Product(
    122, "Tennessee", 176)
];


}