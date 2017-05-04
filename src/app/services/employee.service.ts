/*
*	Employee Service.ts
*	Sends and returns information about employees(Associate, Manager, Administrator)
*	to and from the database
*/

import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import { Associate, Administrator, Manager, iloginCredentials } from '../classes';
import { LoginErrors } from '../enums';

export interface iLoginResponse{
	associate?:Associate
	error?:LoginErrors
}

export interface iAssociateResponse{
	employees?:Associate[]
	error?:LoginErrors
}

@Injectable()

export class EmployeeService{
	loginEmployee = new EventEmitter<Associate>();
	currentEmployee:Associate = null;
	constructor(){
		
	}
	getEmployees():Promise<iAssociateResponse>{

		return Promise.resolve({employees:this.tempEmployees});
	}

	verifyEmployeeCredentials(credentials:iloginCredentials):Promise<iLoginResponse>{
		
		let associate:Associate = this.tempEmployees.find(
								(associate)=> { 
									return associate.id == credentials.id 
								});
		if(associate && associate.password == credentials.password){
			return Promise.resolve({associate:associate});
		}
		else
			return Promise.resolve({associate:null, error:LoginErrors.INVALID});	

	}

	login(associate:Associate){
		this.currentEmployee = associate;
	}

	logout(){
		this.currentEmployee = null;
	}
	

	tempEmployees:Associate[] = [
		new Associate(22,"Rey Castro","castro1"),
		new Administrator(23,"Leon","password"),
		new Administrator(24,"Bob3",""),
		new Manager(23,"Chris","1234"),
		new Manager(2324,"Bob5","pword")
	];
}