import { Component } from '@angular/core';
import { Associate, Transaction } from './classes';




@Component({
  selector: 'app-root',
  template: `
    <div [ngSwitch]="navigation" class="container">
    <h1 style="font-size=2em">The P.O.S.</h1>

      <display-employee></display-employee>
  		<login *ngIf="!loggedIn" (success)="login($event)"></login>
  	  

    </div>

  `,
  styleUrls: ['./app.component.css', './solar-bootstrap-theme.min.css']
})
export class AppComponent {
  title = 'app works!';
  loggedIn = false;
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
