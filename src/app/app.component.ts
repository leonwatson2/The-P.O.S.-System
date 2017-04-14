import { Component } from '@angular/core';
import { Associate, Transaction } from './classes';




@Component({
  selector: 'app-root',
  template: `
    <div [ngSwitch]="navigation" class="container">
    <h1 style="font-size=2em">The P.O.S.</h1>
        <ul class="nav nav-pills">
          <li 
            *ngIf="loggedIn"
            (click)="navigation=navRoutes[3]">
            <a href="#">Checkout</a></li>
          
          <li 
              *ngIf="loggedIn" 
              (click)="navigation=navRoutes[2]">
              <a href="#">Past Transactions</a>
          </li>
          
          <li 
            *ngIf="loggedIn"
            (click)="logout()"
          ><a href="#">Logout</a></li>
        </ul>
  		<login *ngIf="!loggedIn" (success)="login($event)"></login>
  		
      <checkout 
        *ngSwitchCase="navRoutes[3]"
        [associate]="associate" 
        (processed)="addTransaction($event)"></checkout>
      
      <transaction-history 
        *ngSwitchCase="navRoutes[2]"
        [transactions]="transactions"
        ></transaction-history>



        <admin-dashboard (updateProducts)="addProduct($event)"></admin-dashboard>
    </div>

  `,
  styleUrls: ['./app.component.css', './solar-bootstrap-theme.min.css']
})
export class AppComponent {
  title = 'app works!';
  loggedIn = true;
  associate:Associate = new Associate(1,"Me", "Password");
  navRoutes = ['login','logout','history','checkout'];
  navigation;
  transactions:Transaction[] = [];
  
  ngOnInit(){
    
    this.navigation = this.navRoutes[3];
  }

  login(act){
  	this.associate = act.associate;
  	this.loggedIn = true;
    this.navigation = this.navRoutes[3];
  }

  logout(){
    this.loggedIn = false;
    this.navigation = this.navRoutes[0];
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
