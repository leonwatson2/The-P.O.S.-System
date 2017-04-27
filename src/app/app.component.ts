import { Component } from '@angular/core';
import { Associate, Transaction, eAssociateLevel } from './classes';

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
         <login 
         *ngSwitchDefault
         (success)="login($event)"></login>
         <manager-dashboard 
             *ngSwitchCase="eAssociateLevel.MANAGER"
             [manager]="associate"></manager-dashboard>
          <admin-dashboard 
              *ngSwitchCase="eAssociateLevel.ADMINISTRATOR"
              [administrator]="associate"></admin-dashboard>
          <associate-dashboard 
              *ngSwitchCase="eAssociateLevel.ASSOCIATE"
              [associate]="associate"></associate-dashboard>
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
  
  ngOnInit(){
    
  }

  login(event){
  	this.associate = event.associate;
    this.loggedIn = true;
      
    switch(this.associate.tierLevel){
      case eAssociateLevel.ADMINISTRATOR:
        console.log("Admin", this.associate);
        break;
      case eAssociateLevel.MANAGER:
        console.log("Manager", this.associate);
        break;
      case eAssociateLevel.ASSOCIATE:
        console.log("Associate", this.associate);
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
