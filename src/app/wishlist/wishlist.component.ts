import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBook, ProductsService } from '../products.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent {
  favoriteProducts: IBook[] = [];
  isLoading: boolean = true;
  msg = '';
  constructor(private productsService: ProductsService) {}

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
}
