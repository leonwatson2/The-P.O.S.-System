/*
*	Employee Service.ts
*	Sends and returns information about employees(Associate, Manager, Administrator)
*	to and from the database
*/

import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Associate, Administrator, Manager } from '../classes';


declare var window:any;

@Injectable()

export class EmployeeService{

	getEmployees():Promise<Associate[]>{

		return Promise.resolve(this.tempEmployees);
	}

	verifyEmployeeCredentials(employee:Associate):Associate{
		
		this.tempEmployees.forEach()

		return employee;
	}

	tempEmployees:Associate[] = [
		new Associate(22,"Bob",""),
		new Administrator(22,"Bob2",""),
		new Administrator(22,"Bob3",""),
		new Manager(22,"Bob4",""),
		new Manager(22,"Bob5","")
	];
}