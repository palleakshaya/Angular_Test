import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from '../products.service';
import { IBook } from '../products.service';
@Component({
  selector: 'app-addproductdialog',
  standalone: true,
  imports: [],
  templateUrl: './addproductdialog.component.html',
  styleUrl: './addproductdialog.component.scss',
})
export class AddproductdialogComponent {
  addProductForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private dialogRef: MatDialogRef<AddproductdialogComponent>
  ) {
    this.addProductForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      imageURL: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.addProductForm.valid) {
      this.productsService.addNewProduct(this.addProductForm.value).subscribe({
        next: (response) => {
          console.log('Product added successfully', response);
          this.dialogRef.close('success');
        },
        error: (error) => {
          console.error('Error adding product:', error);
          this.dialogRef.close('error');
        },
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
