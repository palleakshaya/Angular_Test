import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.signupForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        cpassword: ['', [Validators.required]],
      },
      { Validators: this.passwordMatchValidator() }
    );
  }
  passwordMatchValidator(): Validators {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
      const password = formGroup.get('password');
      const confirmPassword = formGroup.get('cpassword');

      if (
        password &&
        confirmPassword &&
        password.value !== confirmPassword.value
      ) {
        return { passwordMismatch: true };
      }
      return null;
    };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      // Perform signup logic here, including sending the data to the backend
      // Store the token in localStorage if signup is successful
      const userData = this.signupForm.value;
      // Call the signup service to send data to backend and get token
      // this.signupService.signup(userData).subscribe((response: any) => {
      //   if (response.token) {
      //     localStorage.setItem('userToken', response.token);
      //     localStorage.setItem('userId', response.userId);
      this.router.navigate(['/products']);
      //   }
      // });
    }
  }

  // onLogin() {
  //   // this.router.navigate(['/login']);
  // }
}
