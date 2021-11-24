import { AuthService } from './../shared/auth.service';
import { SignupRequestPayload } from './signup-request.payload';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupRequestPayload: SignupRequestPayload;
  signupForm!: FormGroup;
  isShowingRegistrationErrorNotification: boolean;

  constructor(private authService: AuthService, private router: Router ) { 
    this.signupRequestPayload = {
      username: '',
      password: ''
    };

    this.isShowingRegistrationErrorNotification = false;
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  get email() { return this.signupForm.get('email')!; }

  get password() { return this.signupForm.get('password')!; }

  signup() {
    this.signupRequestPayload.username = this.email.value;
    this.signupRequestPayload.password = this.password.value;

    this.authService.signup(this.signupRequestPayload)
      .subscribe(() => {
        this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
      }, () => {
        this.isShowingRegistrationErrorNotification = true;
      });
  }

  closeNotification() {
    this.isShowingRegistrationErrorNotification = false;
  }
}
