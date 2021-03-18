import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  //Create a constructor
  constructor(private authService: AuthService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
      console.log("Guard");
      //const expectedRole = route.url.toString();
      const expectedRole = route.data.role;
      console.log("Guard Expected Role: " + expectedRole)
      const currentrole = localStorage.getItem('ACCESS_ROLE');
      console.log("Guard Role: " + currentrole)
  
      if (currentrole !== expectedRole)
      {
        this.router.navigateByUrl('login');
        return false;
      }
       //return this.authService.isLoggedIn();
      return true;

  }

}
