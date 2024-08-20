import { Component } from '@angular/core';
import { IBook, ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    MatCardModule,
    CurrencyPipe,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  everyProduct!: IBook;
  isLoading: boolean = true;
  msg = '';

  // trustedUrl!: SafeUrl;
  constructor(
    public productsService: ProductsService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar, // Inject MatSnackBar
    private router: Router // Inject Router
  ) {}

  ngOnInit() {
    let bookId = this.route.snapshot.paramMap.get('id') as string; // From URL
    console.log(bookId);
    this.productsService
      .getProductsByid(bookId)
      .then((data) => {
        this.everyProduct = data;
        this.isLoading = false;
        console.log(this.everyProduct);
        // this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        //   this.everyProduct.image
        // );
      })
      .catch(() => {
        this.isLoading = false;
        this.msg = 'Something went wrong';
      });
  }
  addToFavourites(): void {
    // Example logic to add product to favorites
    const bookId = this.everyProduct.bookId;
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (!favorites.includes(bookId)) {
      favorites.push(bookId);
      localStorage.setItem('favorites', JSON.stringify(favorites));

      this.snackBar
        .open('Added to favorites!', 'View Wishlist', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        })
        .onAction()
        .subscribe(() => {
          this.router.navigate(['/wishlist']);
        });
    } else {
      this.snackBar.open('Already in favorites!', 'OK', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    }
  }
}
