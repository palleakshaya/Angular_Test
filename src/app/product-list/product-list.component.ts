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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
// import { AddProductComponent } from '../add-product/add-product.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AuthService } from '../auth.service';
import { AddproductdialogComponent } from '../addproductdialog/addproductdialog.component';
import { AddProductComponent } from '../add-product/add-product.component';
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
    MatProgressSpinnerModule,
    MatIconModule,
    MatPaginator,
    AddProductComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  searchForm!: FormGroup;
  products: any = [];
  isLoading: boolean = true;
  isAdmin = false;
  msg = '';
  filteredProducts: any[] = [];
  noResults: boolean = false;
  // pageSize = 10;
  // currentPage = 0;
  // paginatedProducts: any[] = [];
  constructor(
    public productsService: ProductsService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private authService: AuthService
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
    this.isAdmin = this.authService.isAdmin(); // Assuming isAdmin() is a method in AuthService
    console.log('isAdmin', this.isAdmin);
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
        this.products = data;
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
        // this.filteredProducts = data;
        this.isLoading = false;
        // console.log(this.products);
      })
      .catch(() => {
        this.isLoading = false;
        this.msg = 'Something went wrong';
      });
  }
  openAddProductDialog(): void {
    const dialogRef = this.dialog.open(AddproductdialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        this.loadProducts(); // Reload the product list after adding a new product
      }
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
  // openAddProductDialog(): void {
  //   this.dialog.open(AddProductDialogComponent, {
  //     width: '400px'
  //   });
  // }

  // updatePaginatedProducts() {
  //   const startIndex = this.currentPage * this.pageSize;
  //   const endIndex = startIndex + this.pageSize;
  //   this.paginatedProducts = this.products.slice(startIndex, endIndex);
  // }

  // onPageChange(event: PageEvent) {
  //   this.pageSize = event.pageSize;
  //   this.currentPage = event.pageIndex;
  //   this.updatePaginatedProducts();
  // }
}
