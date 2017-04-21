import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import {DisplayEmployeeComponent} from './display-employee.component';

@NgModule({
	declarations: [
		DisplayEmployeeComponent,
	],

imports: [
	BrowserModule,
	FormsModule,
],

exports:[
	DisplayEmployeeComponent,
]
})
export class EmployeeModule{ }