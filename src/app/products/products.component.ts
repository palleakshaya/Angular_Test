import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { IBook } from '../products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
@Component({
  selector: 'app-products',
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
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  @Input() bookId: any;
  @Input() product: IBook = {
    bookId: '1',
    title: 'Indriyan',
    author: 'Sreenath Deshagani',
    price: 7.05,
    description:
      'This accelerated story narrative of Ajays search for his Unknown father has a blend of reality and fantasy, with a lot of twists and turns that makes your reading a rollercoaster ride.',
    rating: 5,
    category: 'Gothic Fiction',
    imageURL: 'https://m.media-amazon.com/images/I/5100TBriGTL.jpg',
    stock: 20,
    qty: 0,
  };

  isLoading: boolean = true;
  msg = '';
  filteredProducts: any = [];
  searchQuery: string = '';
  constructor(
    public productsService: ProductsService,
    private route: ActivatedRoute,
    public router: Router,
    private snackBar: MatSnackBar
  ) {}
  @Output() addItemEvent: EventEmitter<any> = new EventEmitter<any>();
  // addToCart() {
  //   this.addItemEvent.emit(this.product);
  // }

  addToCart() {
    this.productsService.addProduct(this.product);
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 3000, // Duration in milliseconds
      verticalPosition: 'bottom', // Position on the screen
      horizontalPosition: 'center', // Position on the screen
      panelClass: ['snack-bar-success'],
    });
  }
  // this.productsService.addProduct(this.product);
  // this.snackBar.open('Added to cart successfully!', 'Close', {
  //   duration: 2000, // Duration in milliseconds
  //   verticalPosition: 'bottom', // Position on the screen
  //   horizontalPosition: 'center', // Position on the screen
  // });
}

// products = [
//   {
//     id: 1,
//     name: 'Gaming Laptop',
//     description:
//       'A powerful gaming laptop with high-end graphics and fast processor.',
//     price: 1499.99,
//     category: 'Electronics',
//     image:
//       'https://www.fivetechblog.co.uk/wp-content/uploads/2021/04/HP-OMEN-15-dc1015na.jpg',
//   },
//   {
//     id: 2,
//     name: 'Smartwatch',
//     description:
//       'A stylish smartwatch with fitness tracking features and notifications.',
//     price: 199.99,
//     category: 'Accessories',
//     image:
//       'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MT2Y3ref_VW_34FR+watch-case-41-aluminum-pink-nc-s9_VW_34FR+watch-face-41-aluminum-pink-s9_VW_34FR_WF_CO_GEO_IN?wid=5120&hei=3280&bgc=fafafa&trim=1&fmt=p-jpg&qlt=80&.v=Z0VkY0NhREJ6WjFzb3N5VEYrKzFoQjJXVW9BNEhuTURaNVlmRjZxRXZQeXlESTJEU21VQ3kwMTlnSk9SWXc3T1lmQTM3dWwxOEVOeWkrSnZJS3hUWHNZUk12MUVIVHRxUC9tRlNJeUZ4LzNvRFBDZ2ppL3VKbG5SaHlPeG9SOGNWRGRkNWd6OXhEb2lBTXYxZnpxbGdLMCtHMVlHSGttWG40UU14R241ekFhYmZuSTdFUnErS0g3SWYxazQrNDdyRzE3K0tORmZaUy9vOVdqTEp2dmJNMGdNL3BvRkdKVDVQdS91YnVnbnJuZ3JPZ0xXb3dPVUV6bytXY1hzR2F1cg==',
//   },
//   {
//     id: 3,
//     name: 'Wireless Earbuds',
//     description:
//       'Compact wireless earbuds with excellent sound quality and noise cancellation.',
//     price: 129.99,
//     category: 'Accessories',
//     image: 'https://cdn.mgig.fr/2022/09/mg-55e46b1e-w1960-w828-w1300.jpg',
//   },
//   {
//     id: 4,
//     name: 'Air Purifier',
//     description:
//       'An advanced air purifier with HEPA filter for cleaner air in your home.',
//     price: 249.99,
//     category: 'Home Appliances',
//     image:
//       'https://m.media-amazon.com/images/I/51hJSnXkWRL._AC_UF894,1000_QL80_.jpg',
//   },
//   {
//     id: 5,
//     name: 'Smart TV',
//     description:
//       '4K Ultra HD Smart TV with built-in streaming apps and voice control.',
//     price: 799.99,
//     category: 'Electronics',
//     image:
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNSIgzOWX8L6LGlExAyveIu3iL_AtwpTIEiw&s',
//   },
// ];
