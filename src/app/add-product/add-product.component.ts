import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { IBook, ProductsService } from '../products.service';
import { AuthService } from '../auth.service';
import { AddproductdialogComponent } from '../addproductdialog/addproductdialog.component';
import { MatDialog } from '@angular/material/dialog';
// import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatCardModule,
    RouterLink,
    CurrencyPipe,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent {
  productForm!: FormGroup;
  isAdmin: boolean = false; // Flag to check if user is admin

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.productForm = this.fb.group({
      bookId: [''],
      title: [''],
      author: [''],
      // price: [''],
      // imageURL: ['', Validators.required],
    });
  }

  addNewProduct(): void {
    if (this.productForm.valid) {
      this.productsService.addNewProduct(this.productForm.value).subscribe({
        next: (response: IBook) => {
          console.log('Product added successfully', response);
          this.router.navigate(['/products']); // Navigate to products list
        },
        error: (error) => {
          console.error('Error adding product:', error);
        },
      });
    }
  }
  openAddProductDialog(): void {
    const dialogRef = this.dialog.open(AddproductdialogComponent, {
      width: '500px',
      // Pass data or configuration if needed
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result === 'success') {
          // Optionally refresh product list or handle successful addition
          console.log('Product added from dialog');
        }
      },
      error: (error) => {
        console.error('Error closing dialog:', error);
      },
    });
  }
}
