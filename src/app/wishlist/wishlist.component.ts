import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBook, ProductsService } from '../products.service';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatIconButton],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent {
  favoriteProducts: IBook[] = [];
  isLoading: boolean = true;
  msg = '';
  constructor(
    private productsService: ProductsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (favorites.length > 0) {
      // Fetch details of each favorite product
      Promise.all(
        favorites.map((id: string) => this.productsService.getProductsByid(id))
      )
        .then((products) => {
          this.favoriteProducts = products;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
          this.msg = 'Unable to load wishlist';
        });
    } else {
      this.isLoading = false;
      this.msg = 'No favorites found';
    }
  }
  removeFromWishlist(product: IBook) {
    this.favoriteProducts = this.favoriteProducts.filter(
      (item) => item.bookId !== product.bookId
    );
    this.snackBar.open('Removed from wishlist', 'Close', {
      duration: 2000, // Duration the snackbar is displayed
      verticalPosition: 'bottom', // Position on the screen
      horizontalPosition: 'center', // Position on the screen
    });
  }
}
