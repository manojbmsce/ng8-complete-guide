import { Component, OnInit, ViewChild, ɵSWITCH_COMPILE_NGMODULE__POST_R3__ } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  @ViewChild('loginForm', {static: false}) loginForm: NgForm;
  isLoginMode = false;
  isLoading = false;
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  switchLoginMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(){
    this.errorMessage = '';
    this.isLoading = true;
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;

    let authObservable: Observable<AuthResponseData>;
    if(this.isLoginMode) {
      authObservable = this.authService.signIn(email, password)
    } else {
      authObservable = this.authService.signup(email, password);
    }
    authObservable.subscribe((response)=> {
        this.isLoading = false;
        console.log(response);
        this.router.navigate(['/recipes']);
      },error => {
        this.isLoading = false;
        this.errorMessage = error;
      }
    );
    this.loginForm.reset();
  }

}
