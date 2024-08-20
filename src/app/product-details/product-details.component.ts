import { Component } from '@angular/core';
import { IBook, ProductsService } from '../products.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [MatCardModule, CurrencyPipe],
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
    private sanitizer: DomSanitizer
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
}
