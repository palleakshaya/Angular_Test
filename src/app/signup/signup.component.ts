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
import { MatIconModule } from '@angular/material/icon';
import { SignupService } from '../signup.service';
import { SignupUser } from '../signup.service';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
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
    MatIconModule,
    // MatSnackBarModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signupForm: FormGroup;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private signupService: SignupService,
    private snackBar: MatSnackBar
  ) {
    this.signupForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        cpassword: ['', [Validators.required]],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(
    formGroup: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('cpassword');

    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }
  onSubmit() {
    if (this.signupForm.valid) {
      const userData: SignupUser = this.signupForm.value;
      this.signupService
        .signup(userData)
        .then((response) => {
          console.log('Signup response:', response); // Debug response
          if (response.token) {
            localStorage.setItem('userToken', response.token);
            localStorage.setItem('userId', response.username); // Adjust as needed
            console.log('Showing Snackbar for successful signup');
            this.snackBar.open(
              'Signed up successfully! You can login now🎊',
              'Close',
              {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
              }
            );
            this.router.navigate(['/login']);
          }
        })
        .catch((error) => {
          console.error('Signup failed', error);
          this.snackBar.open('Signup failed. Please try again.', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        });
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  // onLogin() {
  //   // this.router.navigate(['/login']);
  // }
}
