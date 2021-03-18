import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from './user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient,
    private router: Router) { }

  public loginVerify(user: User) {
    console.log(user.userName);
    console.log(user.password);
    // calling webservice url and passing username and password
    return this.httpClient.get<User>(environment.apiUrl + "/api/user-login/" + user.userName + "&" + user.password)

  }

  public logout() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    localStorage.removeItem('ACCESS_ADMIN');
    localStorage.removeItem('ACCESS_MGR');
    localStorage.removeItem('ACCESS_ROLE');
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('username');
    sessionStorage.removeItem('ACCESS_ADMIN');
    sessionStorage.removeItem('ACCESS_MGR');
  }

  /*
  //Credentials
  public isLoggedIn() {
    if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {
      console.log("isLoggedIn...")
      if (localStorage.getItem('ACCESS_ADMIN') == null && localStorage.getItem('ACCESS_MGR') == null) {
        this.router.navigateByUrl('login');
      }
      else {
        return localStorage.getItem('ACCESS_ADMIN') !== null || localStorage.getItem('ACCESS_MGR') !== null;
      }
    }
    else {
      this.router.navigateByUrl('login');
    }
  }
  */
}
