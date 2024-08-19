import { Component } from '@angular/core';
import { IBook, ProductsService } from '../products.service';
import { ProductsComponent } from '../products/products.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, of, switchMap, catchError, startWith } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    ProductsComponent,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  searchForm!: FormGroup;
  products: any = [];
  isLoading: boolean = true;
  msg = '';
  filteredProducts: any[] = [];
  noResults: boolean = false;
  constructor(
    public productsService: ProductsService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      search: '',
    });
    // console.log(this.movieService.movies)
  }
  trackById(index: number, product: any): string {
    return product.id;
  }
  ngOnInit() {
    this.loadProducts();
    this.searchForm
      .get('search')
      ?.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        switchMap((searchTerm) =>
          this.productsService.searchUser(searchTerm).pipe(
            catchError((error) => {
              console.log(error);
              return of([]);
            })
          )
        )
      )
      .subscribe((data) => {
        console.log(data);
        this.isLoading = false;
        this.filteredProducts = data;
      });
    // console.log(data);
    // this.filteredProducts = data;
    // this.noResults = data.length === 0;
    // // this.products = data;
    // this.isLoading = false;
  }
  loadProducts() {
    this.productsService
      .getProducts()
      .then((data: any) => {
        this.products = data;
        this.filteredProducts = data;
        this.isLoading = false;
      })
      .catch(() => {
        this.isLoading = false;
        this.msg = 'Something went wrong';
      });
  }

  addOneProduct(item: any) {
    return this.productsService.addProduct(item);
  }
  // addToCart(product: any) {
  //   console.log(product);
  //   this.productsService.addingCart(product);
  //   //    this.route.navigate([`cart/${product.id}`]);
  // }
}
