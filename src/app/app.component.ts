import { Component } from '@angular/core';
import { Associate, Administrator, Manager, Transaction } from './classes';




@Component({
  selector: 'app-root',
  template: `
    <div [ngSwitch]="navigation" class="container">
    <h1 style="font-size=2em">The P.O.S.</h1>
       
       <manager-dashboard></manager-dashboard>
        <admin-dashboard></admin-dashboard>
        <associate-dashboard></associate-dashboard>

    </div>

  `,
  styleUrls: ['./app.component.css', './solar-bootstrap-theme.min.css']
})
export class AppComponent {

  

  loggedIn = false;
  associate:Administrator = new Administrator(1,"Me", "Password");
  

  navRoutes = ['login','logout','history','checkout'];
  navigation;
  transactions:Transaction[] = [];
  
  ngOnInit(){
    
    this.navigation = this.navRoutes[3];
  }

  login(act){
  	this.associate = act.associate;
  	this.loggedIn = true;
    this.isAdmin = true;
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
