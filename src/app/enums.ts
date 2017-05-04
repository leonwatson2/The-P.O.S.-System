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
//Make one enum for all errors
export enum eAppErrors{
	INVALID = 2,
	NOTFOUND, 
	SERVERERROR,
	DUPLICATE
}

export enum eFormType{
	ADD = 0,
	EDIT
}