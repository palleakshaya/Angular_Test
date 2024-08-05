import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductsComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  products: any = [];
  isLoading: boolean = true;
  msg = '';
  constructor(public productsService: ProductsService) {
    // console.log(this.movieService.movies)
  }
  ngOnInit() {
    this.loadProducts();
  }
  loadProducts() {
    this.productsService
      .getProducts()
      .then((data: any) => {
        this.products = data;
        this.isLoading = false;
      })
      .catch(() => {
        this.isLoading = false;
        this.msg = 'Something went wrong';
      });
  }
}
