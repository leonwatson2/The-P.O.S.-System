import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Associate, Transaction, eAssociateLevel } from './classes';
import { EmployeeService } from './services/employee.service';


@Component({
  selector: 'app-root',
  template: `
    <div class="container">
    <h1 style="font-size=2em"><a routerLink="/">The P.O.S.</a></h1>

       <div [ngSwitch]="associate?.tierLevel">
         <router-outlet></router-outlet>
       </div>
        <div class="logout">
          <button
            class="btn btn-warning" 
            *ngIf="loggedIn"
            (click)="logout()"
            >Logout</button>
        </div>
    </div>

  `,
  styleUrls: ['./app.component.css', './styles/style.css']
})
export class AppComponent {

  
  eAssociateLevel = eAssociateLevel;
  loggedIn = false;
  associate:Associate;
  
  transactions:Transaction[] = [];
  constructor(private employeeService:EmployeeService, private router:Router){

  }
  ngOnInit(){
    this.employeeService.loginEmployee.subscribe((asso:Associate)=>{
      this.employeeService.login(asso);
      this.login(asso);

    });
  }

  ngOnChanges(){
      
  }
  login(associate:Associate){
  	this.associate = associate;
    this.loggedIn = true;
      
    switch(this.associate.tierLevel){
      case eAssociateLevel.ADMINISTRATOR:
        this.router.navigate(['/admin']);
        break;
      case eAssociateLevel.MANAGER:
        this.router.navigate(['/manager']);
        break;
      case eAssociateLevel.ASSOCIATE:
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
    this.employeeService.logout();
    this.router.navigate(['/']);
  }

  addTransaction(transaction:Transaction){
    this.transactions.push(transaction);
  }

  addProduct(event){
    console.log(event);
  }
}
