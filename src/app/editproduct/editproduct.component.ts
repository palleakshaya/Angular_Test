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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductsService } from '../products.service';
import { IBook } from '../products.service';
@Component({
  selector: 'app-editproduct',
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
  templateUrl: './editproduct.component.html',
  styleUrl: './editproduct.component.scss',
})
export class EditproductComponent {
  productForm!: FormGroup;
  // bookId: string;
  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      bookId: [''],
      title: [''],
      author: [''],
      price: [''],
      imageURL: [''],
      category: [''],
      rating: [''],
      description: [''],
    });
  }

  // loadProduct(): void {
  //   this.productService.getProductsByid(this.).subscribe(product => {
  //     this.product = product;
  //     this.productForm.patchValue(product);
  //   });
  // }
  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.productsService
        .getProductsByid(bookId)
        .then((product) => {
          this.productForm.patchValue(product);
        })
        .catch((error) => {
          console.error('Error fetching product:', error);
        });
    }
  }
  updateProduct() {
    if (this.productForm.valid) {
      const updatedProduct: IBook = this.productForm.value;
      const bookId = this.productForm.get('bookId')?.value;
      if (bookId) {
        this.productsService
          .updateProduct(bookId, updatedProduct)
          .then(() => {
            this.router.navigate(['/products']);
          })
          .catch((error) => {
            console.error('Error updating product:', error);
          });
      }
    }
  }
}
