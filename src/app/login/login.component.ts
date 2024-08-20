import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { LoginService } from '../login.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  onLogin() {
    this.loginError = null;
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.loginService
        .login(this.loginForm.value)
        .then((data) => {
          if (data.token) {
            localStorage.setItem('token', data.token);
            this.router.navigate(['/orders']);
          } else {
            // this.logOut();
            this.loginError = 'Invalid credentials. Please try again.';
          }
        })
        .catch((err) => {
          console.log('Login Failed', err);
        });
    }
  }
  // if (this.loginForm.valid) {
  //   // Perform login logic here
  //   // Redirect to dashboard or other page
  //   this.router.navigate(['/products']);
  // }

  onSignup() {
    this.router.navigate(['/signup']);
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
