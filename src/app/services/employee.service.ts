/*
*	Employee Service.ts
*	Sends and returns information about employees(Associate, Manager, Administrator)
*	to and from the database
*/

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Associate, Administrator, Manager, iloginCredentials } from '../classes';
import { LoginErrors } from '../errors';

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
	currentEmployee:Associate = null;

	getEmployees():Promise<iAssociateResponse>{

		return Promise.resolve({employees:this.tempEmployees});
	}

	verifyEmployeeCredentials(credentials:iloginCredentials):Promise<iLoginResponse>{
		
		let associate:Associate = this.tempEmployees.find(
								(associate)=> { 
									return associate.id == credentials.id 
								});
		if(associate && associate.password == credentials.password){
			this.login(associate);
			return Promise.resolve({associate:associate});
		}
		else
			return Promise.resolve({associate:null, error:LoginErrors.INVALID});	

	}

	login(employee:Associate){
		this.currentEmployee = employee;
	}

	tempEmployees:Associate[] = [
		new Associate(22,"Bob",""),
		new Administrator(23,"Bob2",""),
		new Administrator(24,"Bob3",""),
		new Manager(25,"Bob4",""),
		new Manager(2324,"Bob5","pword")
	];
}