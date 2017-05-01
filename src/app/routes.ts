/*
*	route.ts
*	Created By: Leon Watson
* 	This holds all routes and the configurations for the application.
*/
import { RouterModule, Routes, Route } from '@angular/router';

import { iMenuOption } from './classes';


import { LoginComponent } from './login/login.component';
//Dashboards Components
import { AssociateDashboardComponent } from './dashboard/associate-dashboard.component';
import { ManagerDashboardComponent } from './dashboard/manager-dashboard.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard.component';

//Checkout Components
import { CheckOutComponent } from './checkout/checkout.component';
import { DiscountCodeComponent } from './checkout/discount-code.component';
import { TransactionHistoryComponent } from './checkout/transaction-history.component';

//Product Components
import { AddProductComponent } from './products/add-product.component';
import { EditProductComponent } from './products/edit-product.component';
import { SearchProductComponent } from './products/search-product.component';

//Discount Components
import { AddDiscountComponent } from './discounts/add-discount.component';
import { EditDiscountComponent } from './discounts/edit-discount.component';
import { SearchDiscountComponent } from './discounts/search-discount.component';

const addProductRoute:Route = { path: 'products/add', component: AddProductComponent };
const editProductRoute:Route = { path: 'products/edit', component: EditProductComponent };
const searchProductRoute:Route = { path: 'products/search', component: SearchProductComponent };

const addDiscountRoute:Route = { path: 'discounts/add', component: AddDiscountComponent };
const editDiscountRoute:Route = { path: 'discounts/edit', component: EditDiscountComponent };
const searchDiscountRoute:Route = { path: 'discounts/search', component: SearchDiscountComponent };

const checkoutRoute:Route = { path:'checkout', component:CheckOutComponent };

const productRoutes:Routes = [
	addProductRoute,
	editProductRoute,
	searchProductRoute
]

const discountRoutes:Routes = [
	addDiscountRoute,
	editDiscountRoute,
	searchDiscountRoute
]


const associateRoute:Route = { 
	path: 'associate', 
	component: AssociateDashboardComponent,
	children:[searchProductRoute, checkoutRoute] 
}

const managerRoute:Route = { 
	path: 'manager', 
	component: ManagerDashboardComponent,
	children:[searchProductRoute, ...discountRoutes, checkoutRoute] 
}

const adminRoute:Route = { 
	path: 'admin', 
	component: AdminDashboardComponent,
	children:[...productRoutes]
}

const employeeRoutes:Routes = [
	associateRoute,
	managerRoute,
	adminRoute,
]

export const appRoutes: Routes = [
	{ path: '', component: LoginComponent },
	...employeeRoutes,
	{ path: 'checkout', component: CheckOutComponent },
	{ path: 'history', component: TransactionHistoryComponent },
	{ path: 'discount-code', component: DiscountCodeComponent },
	
	/*{ path: 'add-employee', component: AddEmployeeComponent },
	{ path: 'edit-employee', component: EditEmployeeComponent },
	{ path: 'search-employee', component: SearchEmployeeComponent }*/
];


export const adminMenuOptions:iMenuOption[] = [
			{
				name:"Add Product Profile",
				urlPath:"products/add"
			},
			{
				name:"Edit Product Profile",
				urlPath:"products/edit"
			},
			{
				name:"Search Products",
				urlPath:"products/search"
			},
			{
				name:"Add Employee Profile",
				urlPath:"employees/add"
			},
			{
				name:"Edit Employee Profile",
				urlPath:"employees/edit"
			},
			{
				name:"Search Employee Profile",
				urlPath:"employees/search"
			}]

export const associateMenuOptions:iMenuOption[] = [
			{
				name:"Checkout",
				urlPath:"checkout"
			},
			{
				name:"Search Products",
				urlPath:"products/search"
			},
			{
				name:"Add Customer Profile",
				urlPath:"customers/add"
			},
			{
				name:"Edit Customer Profile",
				urlPath:"customers/edit"
			},
			{
				name:"Search Customer Profile",
				urlPath:"customers/search"
			}]

export const managerMenuOptions:iMenuOption[]=[{
				name:"Checkout",
				urlPath:"checkout"
			},
			{
				name:"Search Products",
				urlPath:"products/search"
			},
			{
				name:"Add Customer Profile",
				urlPath:"customers/add"
			},
			{
				name:"Edit Customer Profile",
				urlPath:"customers/edit"
			},
			{
				name:"Search Customer Profile",
				urlPath:"customers/search"
			},
			{
				name:"Add Employee Profile",
				urlPath:"employees/add"
			},
			{
				name:"Edit Employee Profile",
				urlPath:"employees/edit"
			},
			{
				name:"Search Employee Profile",
				urlPath:"employees/search"
			},
			{
				name:"Add Discount",
				urlPath:"discounts/add"
			},
			{
				name:"Search/Edit Discount",
				urlPath:"discounts/edit"
			}]

