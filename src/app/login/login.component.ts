import { Component, Output, EventEmitter} from '@angular/core';
import { Associate, iloginCredentials, eAssociateLevel } from '../classes';
import { EmployeeService, iLoginResponse, iAssociateResponse } from '../services/employee.service';

import { eAppErrors } from '../enums';
@Component({
	selector: 'login',
	template: `
	<div class="container">
			<h2>Login</h2>
			<form (ngSubmit)="login($event)" #loginForm="ngForm" class="form-horizontal">
				<div class="form-group">
				<input
					[(ngModel)]="lC.username" 
					class="form-control"
					type="text" 
					placeholder="ID Number"
					name="idNum"
					/>
					<div *ngIf="true">
					TODO:Test Login
						<div 
							*ngFor="let employee of validCredentials"
							(click)="lC.username = employee.username; lC.password = employee.password; login($event);" >
							Id:{{employee.username}}, TierLevel: {{eAssociateLevel[employee.tierLevel]}}
						</div>
					</div>
				</div>
				<div class="form-group">
					<input 
						[(ngModel)]="lC.password"
						class="form-control"
						type="password" 
						name="pass"
						/>
				</div>

				<div [ngSwitch]="error">
					<div *ngSwitchCase="eAppErrors.INVALID">Incorrect Username and/or Password</div>

				</div>
				<button
					class="btn btn-success" 
					type="Submit">
					Login</button>
			</form>
	</div>
			`,
  styleUrls: ['../styles/style.css', './login.css']

})

export class LoginComponent {
	lC:iloginCredentials = {username:null, password:""};
	validCredentials:Associate[] = [];
	eAssociateLevel = eAssociateLevel;
	eAppErrors = eAppErrors;
	error:eAppErrors = null;
	constructor(private employeeService:EmployeeService){
		
	}

	ngOnInit(){
		this.employeeService.getEmployees()
		.subscribe((response:iAssociateResponse)=>{
			this.validCredentials = response.employees
		})
	}

	// Verifies the credentials with the service
	// Displays error if the service returns null
	// Otherwise emits event of the employee info
	login(e){
		this.employeeService
			.verifyEmployeeCredentials(this.lC)
			.subscribe((response:iLoginResponse)=>{
			
			console.log("Logded", response);
			if(response.associate){
				let loggedInEmployee = new Associate(response.associate.username,
													response.associate.id, 
													response.associate.name, 
													response.associate.password, 
													response.associate.tierLevel); 
				this.clearError();
				this.employeeService.loginEmployee.emit(loggedInEmployee);
				
			}
		}, (resError:iLoginResponse)=>{
			console.log(resError);
				this.setError(resError.error);
		});
	}
	

	//set error
	setError(err:eAppErrors){
		this.error = err;
	}
	clearError(){
		this.error = null;
	}
}
