import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { MatIconButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-address-details',
  standalone: true,
  imports: [
    MatCardModule,
    CurrencyPipe,
    CommonModule,
    MatIconButton,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './address-details.component.html',
  styleUrl: './address-details.component.scss',
})
export class AddressDetailsComponent {
  addressForm!: FormGroup;
  address = {
    fullName: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  };
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private productsService: ProductsService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.addressForm = this.fb.group({
      fullName: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],
    });
  }
  confirmOrder() {
    if (this.addressForm.valid) {
      console.log(this.addressForm);
      const orderDetails = history.state.orderDetails;
      orderDetails.address = this.address;

      this.productsService
        .addOrder(orderDetails)
        .then((response) => {
          console.log('Order placed successfully:', response);
          const existingOrders = JSON.parse(
            localStorage.getItem('orderHistory') || '[]'
          );
          // Add the new order to the existing orders
          existingOrders.push(orderDetails);
          // Save updated order history back to localStorage
          localStorage.setItem('orderHistory', JSON.stringify(existingOrders));

          this.snackBar.open('Order placed successfully!', 'Close', {
            duration: 2000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
          });
          this.productsService.clearCart();
          this.router.navigate(['/orders']);
        })
        .catch((error) => {
          console.error('Error placing order:', error);
        });
    } else {
      console.log('Form is invalid');
      this.snackBar.open('Please fill out all required fields.', 'Close', {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    }
  }
  get fullName() {
    return this.addressForm.get('fullName');
  }

  get street() {
    return this.addressForm.get('street');
  }

  get city() {
    return this.addressForm.get('city');
  }

  get state() {
    return this.addressForm.get('state');
  }

  get postalCode() {
    return this.addressForm.get('postalCode');
  }

  get country() {
    return this.addressForm.get('country');
  }
}
