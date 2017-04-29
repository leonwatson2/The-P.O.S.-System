import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Associate, Transaction, eAssociateLevel } from './classes';
import { EmployeeService } from './services/employee.service';


@Component({
  selector: 'app-root',
  template: `
    <div [ngSwitch]="navigation" class="container">
    <h1 style="font-size=2em">The P.O.S.</h1>
      <button 
        *ngIf="loggedIn"
        (click)="logout()"
        >Logout</button>

       <div [ngSwitch]="associate?.tierLevel">
    		 <router-outlet></router-outlet>
       </div>

    </div>

  `,
  styleUrls: ['./app.component.css', './solar-bootstrap-theme.min.css']
})
export class AppComponent {

  
  eAssociateLevel = eAssociateLevel;
  loggedIn = false;
  associate:Associate;
  
  navigation;
  transactions:Transaction[] = [];
  constructor(private employeeService:EmployeeService, private router:Router){
    employeeService.employeeObs.subscribe((employee)=>{
      this.login(employee);
    })
  }
  ngOnInit(){
    
  }

  ngOnChanges(){
      
  }
  login(associate:Associate){
  	this.associate = associate;
    this.loggedIn = true;
      
    switch(this.associate.tierLevel){
      case eAssociateLevel.ADMINISTRATOR:
        console.log("Admin", this.associate);
        this.router.navigate(['/admin']);
        break;
      case eAssociateLevel.MANAGER:
        console.log("Manager", this.associate);
        this.router.navigate(['/manager']);
        break;
      case eAssociateLevel.ASSOCIATE:
        console.log("Associate", this.associate);
        this.router.navigate(['/associate']);
        break;
       default:
         this.loggedIn = false;
    }

  }

  logout(){
    this.loggedIn = false;
    this.associate = null;
    this.transactions = [];
  }

  addTransaction(transaction:Transaction){
    this.transactions.push(transaction);
  }

  addProduct(event){
    console.log(event);
  }
}
