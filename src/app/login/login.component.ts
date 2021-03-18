import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../shared/user';
import { AuthService } from '../shared/auth.service';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isSubmitted = false;
  loginUser: User;
  error = '';
  uName: string;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {

    // formGroup 
    this.loginForm = this.formBuilder.group({

      userName: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required]]

    });
  }

  //Get controls for validation
  get formControls() { return this.loginForm.controls; }
  
  //Login Verify
  loginCredentials() {

    this.isSubmitted = true;

    //invalid entry in form 
    if (this.loginForm.invalid)
      return;

    // valid entry
    if (this.loginForm.valid) {


      //calling method from AuthService
      this.authService.loginVerify(this.loginForm.value).subscribe(data => {
        console.log(data);
        //this.jwtResponse = data;
        //console.log("JWT Response");
        //console.log(this.jwtResponse);
        //sessionStorage.setItem("token", data.token);
        
        //checking roleId
        if (data.roleDetails.roleId === 1) {
          // logged as Manager
          console.log(data.roleDetails.roleId);
          this.uName=data.userName;
          sessionStorage.setItem("un", this.uName);

          console.log("ACCESS_MGR");
          sessionStorage.setItem("ACCESS_MGR", "logged");
          localStorage.setItem("ACCESS_MGR", "logged");
          localStorage.setItem("ACCESS_ROLE", data.roleDetails.roleId.toString());
          sessionStorage.setItem("username", data.userName);
          this.router.navigateByUrl('/manager');

        }
        else if (data.roleDetails.roleId === 2) {
          // logged as Admin/Cordinator
          console.log(data.roleDetails.roleId);
          sessionStorage.setItem("ACCESS_ADMIN", "logged");
          localStorage.setItem("ACCESS_ADMIN", "logged");
          localStorage.setItem("ACCESS_ROLE", data.roleDetails.roleId.toString());
          sessionStorage.setItem("username", data.userName);
          this.router.navigateByUrl('/admin');
        }
        else if (data.roleDetails.roleId === 3) {
          // logged as Super admin
          console.log(data.roleDetails.roleId);
          sessionStorage.setItem("ACCESS_SUPADMIN", "logged");
          localStorage.setItem("ACCESS_SUPADMIN", "logged");
          localStorage.setItem("ACCESS_ROLE", data.roleDetails.roleId.toString());
          sessionStorage.setItem("username", data.userName);
          this.router.navigateByUrl('/superadmin');
        }
        else {
          this.error = "Sorry... This Role is Not Allowed To Access This System"
        }
      },
        error => {
          this.error = "Invalid Username and Password"
        });
    }
    else
      return;
  }

}
