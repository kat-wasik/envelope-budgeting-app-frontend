import { LoginRequestPayload } from './login-request.payload';
import { AuthService } from './../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginRequestPayload: LoginRequestPayload;
  loginForm!: FormGroup;

  constructor(private authService: AuthService ) { 
    this.loginRequestPayload = {
      username: '',
      password: ''
    };
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  get email() { return this.loginForm.get('email')!; }

  get password() { return this.loginForm.get('password')!; }

  login() {
    this.loginRequestPayload.username = this.email.value;
    this.loginRequestPayload.password = this.password.value;

    this.authService.login(this.loginRequestPayload)
      .subscribe(data => {
        console.log(data);
      });
  }
}
