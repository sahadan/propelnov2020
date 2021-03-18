import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

    // variable
    userName: string;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem("username");
    console.log(this.userName);
  }

  // logout
  logout() {
    this.authService.logout();
    this.router.navigateByUrl("login");
  }

}
