import { AuthService } from './../shared/auth.service';
import { SignupRequestPayload } from './signup-request.payload';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupRequestPayload: SignupRequestPayload;
  signupForm!: FormGroup;

  constructor(private authService: AuthService ) { 
    this.signupRequestPayload = {
      username: '',
      password: ''
    };
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
      .subscribe(data => {
        console.log(data);
      });
  }
}
