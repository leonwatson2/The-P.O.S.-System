/*
*	route.ts
*	Created By: Leon Watson
* 	This holds all routes and the configurations for the application.
*/
import { RouterModule, Routes, Route } from '@angular/router';

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

//Discount Component
import { AddDiscountComponent } from './discounts/add-discount.component';
import { EditDiscountComponent } from './discounts/edit-discount.component';
import { SearchDiscountComponent } from './discounts/display-discount.component';

const addProductRoute:Route = { path: 'products/add', component: AddProductComponent };
const editProductRoute:Route = { path: 'products/edit', component: EditProductComponent };
const searchProductRoute:Route = { path: 'products/search', component: SearchProductComponent };

const addDiscountRoute:Route = { path: 'products/add', component: AddDiscountComponent };
const editDiscountRoute:Route = { path: 'products/edit', component: EditDiscountComponent };
const searchDiscountRoute:Route = { path: 'products/search', component: SearchDiscountComponent };

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
	children:[...productRoutes] 
}

const managerRoute:Route = { 
	path: 'manager', 
	component: ManagerDashboardComponent,
	children:[searchProductRoute, ...discountRoutes] 
}

const adminRoute:Route = { 
	path: 'admin', 
	component: AdminDashboardComponent,
	children:[searchProductRoute]
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




