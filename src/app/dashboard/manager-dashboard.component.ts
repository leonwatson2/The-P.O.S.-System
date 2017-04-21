import { Component, Input } from '@angular/core';

@Component({
	selector: 'manager-dashboard',
	template: `
		<h2>Manager Dashboard</h2>
		<span>{{manager}}</span>
	`,

})

export class ManagerDashboardComponent {
	@Input() manager:string;


}
