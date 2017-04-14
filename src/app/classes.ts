export class Product{
	constructor(
		public id:number = null, 
		public name:String = "",
		private _cost:number = 0,
		private _amount:number = 1
		){}
	get cost(){
		return this._cost;
	}
	get amount(){
		return this._amount;
	}

	set cost(val){
		this._cost = val;
	}
	set amount(val){
		this._amount = val;
	}

	increamentAmount(){
		this._amount++;
	}
	decreamentAmount(amount:number = 1){
		this._amount -= amount;
	}
}

export class Cart{
	constructor(
		public id:number,
		public items:Product[],
		public total:number,
		public AssociateId:number | null,
		public CustomerId:number | null
		){}

	/*
	*	Adds multiple items to the cart.
	*/
	addItems(products:Product[]){
		products.forEach((p)=>{
			this.addItem(p, p.amount);
		})
	}

	addItem(product:Product, amount:number = 1){
		
		let productIndex:number = this.hasProduct(product);
		if(productIndex == -1){
			this.items.push(product);
		}else{
			this.items[productIndex].increamentAmount();
		}
		this.addToTotal(product, amount);
	}
	/*
	* Adds the cost of the product to 
	* the total of the cart.
	*/
	addToTotal(product:Product, amount:number){
		this.total += product.cost*amount;
	}
	/*
	* Removes the cost of the product to 
	* the total of the cart.
	*/
	subtractFromTotal(product:Product, amount:number){
		this.total -= (product.cost * amount);
	}

	/*
	*	Removes multiple items to the cart.
	* 	Returns the number of items removed.
	*/
	removeItems(products:Product[]):number{
		var numberOfitemsRemoved = 0;
		this.items.forEach((p)=>{
			if(this.removeItem(p))
				numberOfitemsRemoved++;
		})
		return numberOfitemsRemoved;
	}
	/*
	*	Removes an item from the cart.
	* 	Returns true if item was in cart and removed, false otherwise.
	*/
	removeItem(product:Product, amount:number = 1):boolean{
		let productIndex:number = this.hasProduct(product);
		if(productIndex == -1)
			return false;

		this.items[productIndex].decreamentAmount(amount);
		this.subtractFromTotal(product, amount);
		if(this.items[productIndex].amount <= 0){
			this.items[productIndex].amount = 1;
			this.items.splice(productIndex, 1);
		}

		return true;

	}

	/*
	*	Checks if product is already in cart.
	*	Returns the index of item if it is in cart and -1 
	*	if not in cart.
	*/
	hasProduct(product:Product):number{
		return  this.items.findIndex((p)=>{
			return p.id == product.id;
		})

	} 
}


export class Transaction{
	constructor(
		private _id:number,
		private _associateName:string,
		private _receipt:Receipt,
		private _customerProfile:CustomerProfile
		){}
	get id(){
		return this._id
	}
	get associateName(){
		return this._associateName
	}
	get receipt(){
		return this._receipt
	}
	get customerProfile(){
		return this._customerProfile
	}
}
export class Receipt{
	constructor(
		private _products: Product[],
		private _totalCost: number,
		private _id: number,
		private _associateName: String,
		private _dateOfTransaction: Date = new Date(Date.now()),
		private _customerName: String = null
	){}
	get products(){
		return this._products;
	}
	get totalCost(){
		return this._totalCost;
	}
	get id(){
		return this._id;
	}
	get associateName(){
		return this._associateName;
	}
	get date(){
		return this._dateOfTransaction;
	}
	get customer(){
		return this._customerName;
	}
	get numberOfItems(){
		return this._products.length
	}
}
export class CustomerProfile{
	constructor(
		private _name: String,
		private _associateName: String,
		private _managementName: String,
		private _email: String,
		private _phone: number = null,
		private _reciepts:Receipt[] = [],
	){}


	addReceipt(receipt:Receipt){
		this.reciepts.push(receipt);
	}

	get reciepts(){
		return this._reciepts;
	}
	get name(){
		return this._name
	}
	set name(val:String){
		this._name = val;
	}

	get email(){
		return this._email;
	}
	set email(val:String){
		this._email = val;
	}

}

export class Associate{
	constructor(
		private _id:number,
		private _name:string,
		private _password:string
		){}
	get id(){
		return this._id;
	}
	get name(){
		return this._name;
	}
	get password(){
		return this._password;
	}
}

export class Manager extends Associate{

}

export class Discount{
	constructor(
		private _name:String,
		private _value:number){}

	get name(){
		return this._name;
	}

	get value(){
		return this._value;
	}
}




