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

/*
*	Receipt Class
*	private products are the products bought
*	private totalCost is the totalCost at the end of the transaction
*	private id is the unique identification of the receipt
*	private associateName is the name of the associate who performed the transaction
*	private customerName is the name of the customer 
*/

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
		private _id:number = null,
		private _name:string = null,
		private _password:string = null,
		private _tierLevel:eAssociateLevel = eAssociateLevel.ASSOCIATE
		){}

	canCheckout():boolean{
		return this._tierLevel < eAssociateLevel.ADMINISTRATOR;
	}

	isAdmin():boolean{
	 	return this._tierLevel == eAssociateLevel.ASSOCIATE;
	}

	get id(){
		return this._id;
	}
	get name(){
		return this._name;
	}
	get password(){
		return this._password;
	}
	get tierLevel(){
		return this._tierLevel;
	}
}

export class Manager extends Associate{
	constructor(
		_id:number,
		_name:string,
		_password:string,
		_tierLevel:eAssociateLevel = eAssociateLevel.MANAGER){
		super(_id, _name, _password, _tierLevel);
	}
}

export class Administrator extends Associate{
	constructor(
		_id:number,
		_name:string,
		_password:string,
		_tierLevel:eAssociateLevel = eAssociateLevel.ADMINISTRATOR){
		super(_id, _name, _password, _tierLevel);
	}
}

//Used in forms for adding and editing discounts
export interface iDiscount{
	id?:number
	name?:String
	value?:number
	isPercentage?:boolean
}

/*
*	Discount class
*	private name the string that identifies the discount
*	private value the value discounted 
*	private isPercentage is true if the value is a percentage off and
*		false if it is a dollar amount off.
*/
export class Discount{
	constructor(
		private _id:number,
		private _name:String = "",
		private _value:number = 0,
		private _isPercentage:boolean = false){}
	get id(){
		return this._id;
	}

	get name(){
		return this._name;
	}

	get value(){
		return this._value;
	}
	set name(value){
		this._name = value;
	}

	set value(value){
		this._value = value;
	}
	setIsPercentage(value){
		console.log(value);
		this._isPercentage = value;
	}
	
	isPercentage(){
		return this._isPercentage;
	}

	//Check if the value for discount is valid.
	// A positive number and less than 100 when it is a percentage discount.
	isValidValue(){
		return (((this.isPercentage() && this.value < 100) || !this.isPercentage()) && this.value > 0)
	}

	//Updates the current discount from the new discount.
	updateDiscount(newDiscount:iDiscount){
		this._name = newDiscount.name;
			this._value = newDiscount.value;
			this._isPercentage = newDiscount.isPercentage;
	}


}

// Used for Logging in
export interface iloginCredentials{
	id:number, 
	password:string
}

//Enum for the levels of associates
export enum eAssociateLevel{
	ASSOCIATE,
	MANAGER,
	ADMINISTRATOR
}

//Menu Option for Employees
export interface iMenuOption{
	name?:string
	urlPath?:string
}


