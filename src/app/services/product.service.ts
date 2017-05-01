/*
*	Product Service.ts
*	Sends and returns information about products
*	to and from the database.
*/

import { Injectable} from '@angular/core';
import { Http, Headers} from '@angular/http';
import { Observable, Observer} from 'rxjs/Rx';
import { Product, iProduct, Discount, iDiscount } from '../classes';
import { AddItemErrors, EditItemErrors } from '../errors';

export interface iDiscountResponse{
	discount?:Discount | iDiscount
	error?:AddItemErrors
}

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

	getDiscounts():Observable<Discount[]>{

		return Observable.of(this.tempDiscounts);
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
    let nDiscount = new Discount(null, newDiscount.name, newDiscount.value, newDiscount.isPercentage);
		if(indexOfDiscount == -1){
			return Observable.create((observer:Observer<Discount>)=>{
				return observer.error({error:EditItemErrors.NOTFOUND})
			})
		}else if(!nDiscount.isValidValue()){
      return Observable.create((observer:Observer<Discount>)=>{
        return observer.error({error:EditItemErrors.INVALID})
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

	//TODO:display products component
	products = [
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