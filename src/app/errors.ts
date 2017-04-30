/*
*	error.ts 
*	This holds all the enums for errors in the system.
*/

//Errors for login
export enum LoginErrors{
	INVALID = 2,
	SERVERERROR
}

//Adding <t> error
export enum AddItemErrors{
	INVALID = 2,
	DUPLICATE
}
//Adding <t> error
export enum EditItemErrors{
	INVALID = 2,
	NOTFOUND 
}