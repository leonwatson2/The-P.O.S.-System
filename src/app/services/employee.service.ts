/*
*	Employee Service.ts
*	Sends and returns information about employees(Associate, Manager, Administrator)
*	to and from the database
*/

import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import { iAssociate, Associate, Administrator, Manager, iloginCredentials } from '../classes';
import { eAppErrors } from '../enums';

export interface iLoginResponse{
	associate?:iAssociate
	error?:eAppErrors
}

export interface iAssociateResponse{
	employees?:Associate[]
	error?:eAppErrors
}

@Injectable()

export class EmployeeService{
	loginEmployee = new EventEmitter<Associate>();
	currentEmployee:Associate = null;
	constructor(){
		
	}
	getEmployees():Observable<iAssociateResponse>{

		return Observable.of({employees:this.tempEmployees});
	}

	verifyEmployeeCredentials(credentials:iloginCredentials):Observable<iLoginResponse>{
		
		let associate:Associate = this.tempEmployees.find(
								(associate)=> { 
									return associate.username == credentials.username 
								});
		if(associate && associate.password == credentials.password){
			return Observable.of({associate:associate});
		}
		else
			return Observable.of({associate:null, error:eAppErrors.INVALID});	

	}

	login(associate:Associate){
		this.currentEmployee = associate;
	}

	logout(){
		this.currentEmployee = null;
	}
	

	tempEmployees:Associate[] = [
		new Associate("Rey22","22","Rey Castro","castro1"),
		new Administrator("Leon24","23","Leon","password"),
		new Administrator("Bob24","24","Bob3",""),
		new Manager("Chris26","26","Chris","1234"),
		new Manager("2324","2324","Bob5","pword")
	];
}