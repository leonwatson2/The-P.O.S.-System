import { Injectable }     from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EmployeeService } from './employee.service';
import { eAssociateLevel } from '../classes';
@Injectable()
export class AssociateAuthGuardService implements CanActivate {
   
   constructor(private employeeService:EmployeeService, private router:Router){}

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.employeeService.currentEmployee 
    	&& this.employeeService.currentEmployee.tierLevel == eAssociateLevel.ASSOCIATE) { return true; }

    // Store the attempted URL for redirecting
    this.employeeService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/']);
    return false;
  }
}