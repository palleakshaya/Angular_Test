import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  Products: any;
  ProductsList = [];
  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}
  ngOnInit() {
    this.ProductsList = this.productsService.gettingCart();
    // for (let Product of this.ProductsList) {
    //   this.Products = Product;
    // }
    console.log(this.ProductsList[0]);
    this.Products = this.ProductsList[0];
    // this.Products = this.productService.gettingCart();
  }
  deleteProduct() {
    console.log('deleting..');
    this.productsService.deleteProduct(this.Products.id);
  }
  orders() {
    this.router.navigate([`orders`]);
  }
}
