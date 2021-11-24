import { LoginRequestPayload } from './login-request.payload';
import { AuthService } from './../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginRequestPayload: LoginRequestPayload;
  loginForm!: FormGroup;
  isShowingRegistrationSuccessNotification: boolean;
  isShowingLoginErrorNotification: boolean;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router) { 
    this.loginRequestPayload = {
      username: '',
      password: ''
    };

    this.isShowingRegistrationSuccessNotification = false;
    this.isShowingLoginErrorNotification = false;
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });

    this.activatedRoute.queryParams
      .subscribe(params => {
        if (params.registered !== undefined && params.registered === 'true') {
          this.isShowingRegistrationSuccessNotification = true;
        }
      });
  }

  get email() { return this.loginForm.get('email')!; }

  get password() { return this.loginForm.get('password')!; }

  login() {
    this.loginRequestPayload.username = this.email.value;
    this.loginRequestPayload.password = this.password.value;

    this.authService.login(this.loginRequestPayload)
      .subscribe(data => {
        if (data) {
          this.router.navigateByUrl('/accounts');
        } else {
          this.isShowingLoginErrorNotification = true;
        }
      });
  }

  closeSuccessNotification() {
    this.isShowingRegistrationSuccessNotification = false;
  }

  closeErrorNotification() {
    this.isShowingLoginErrorNotification = false;
  }
}
