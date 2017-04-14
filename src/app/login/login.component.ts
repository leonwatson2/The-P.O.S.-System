import { Component, Output, EventEmitter} from '@angular/core';
import { Associate } from '../classes';

class LoginCredentials{
	constructor(public id, public password){

	}
}

@Component({
	selector: 'login',
	template: `
	<div class="container">
			<h2>Login</h2>
			<form (ngSubmit)="login()" #loginForm="ngForm">
				<div class="form-group">
				<input
					[(ngModel)]="lC.id" 
					class="form-control"
					type="text" 
					placeholder="ID Number"
					name="idNum"
					/>
					<span>{{validCredentials.id}}</span>
				</div>
				<div class="form-group">
					<input 
						[(ngModel)]="lC.password"
						class="form-control"
						type="password" 
						name="pass"
						/>
						<span>{{validCredentials.password}}</span>
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
	lC:LoginCredentials  = new LoginCredentials("","");
	validCredentials = new Associate(2324, "Chris", "pword");
	login(){
		if(this.lC.id == this.validCredentials.id && this.lC.password == this.validCredentials.password)
			this.success.emit({associate:this.validCredentials})
	}
}
