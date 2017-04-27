import { Component, Output, EventEmitter} from '@angular/core';
import { Associate, iloginCredentials, eAssociateLevel } from '../classes';
import { EmployeeService, iLoginResponse, iAssociateResponse } from '../services/employee.service';


@Component({
	selector: 'login',
	template: `
	<div class="container">
			<h2>Login</h2>
			<form (ngSubmit)="login($event)" #loginForm="ngForm" >
				<div class="form-group">
				<input
					[(ngModel)]="lC.id" 
					class="form-control"
					type="text" 
					placeholder="ID Number"
					name="idNum"
					/>
					TODO:Test Login
					<div 
						*ngFor="let employee of validCredentials"
						(click)="lC.id = employee.id; lC.password = employee.password; login($event);" >
						Id:{{employee.id}}, TierLevel: {{eAssociateLevel[employee.tierLevel]}}
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
				<button
					class="btn btn-success" 
					type="Submit">
					Login</button>
			</form>
	</div>
			`,
  styleUrls: ['../solar-bootstrap-theme.min.css', './login.css']

})

export class LoginComponent {
	@Output() success = new EventEmitter();
	lC:iloginCredentials = {id:null, password:""};
	validCredentials:Associate[] = [];
	eAssociateLevel = eAssociateLevel;

	constructor(private employeeService:EmployeeService){
		
	}
	ngOnInit(){
		this.employeeService.getEmployees().then((response:iAssociateResponse)=>{
			this.validCredentials = response.employees
		})
	}
	// Verifies the credentials with the service
	// Displays error if the service returns null
	// Otherwise emits event of the employee info
	login(e){
		this.employeeService.verifyEmployeeCredentials(this.lC).then((response:iLoginResponse)=>{
			
			if(response.associate){
				this.success.emit({associate:response.associate});
			}else if(response.error){
				this.setError();
			}else{
				console.log("Unimplemented Error");
			}
		});
	}

	//set error
	setError(){
		console.log("Setting Error");
	}
}
