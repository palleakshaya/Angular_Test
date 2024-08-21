import { Component, Input } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatCard, MatCardModule } from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import {
  MatButton,
  MatButtonModule,
  MatIconButton,
} from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    MatCardModule,
    CurrencyPipe,
    CommonModule,
    MatIconButton,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  Products: any;
  @Input() ProductsList: any = [];
  Total: number = 0;
  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private authService: AuthService
  ) {
    this.ProductsList = productsService.CartData;
    this.calculateGrandTotal();
  }

  calculateGrandTotal() {
    this.Total = this.ProductsList.reduce(
      (total: number, item: { price: string; qty: number }) => {
        return total + parseFloat(item.price) * item.qty;
      },
      0
    );
  }
  total() {
    return;
  }
  ngOnInit() {
    this.ProductsList = this.productsService.gettingCart();
    // for (let Product of this.ProductsList) {
    //   this.Products = Product;
    // }
    // console.log(this.ProductsList[0]);
    //this.Products = this.ProductsList[0];
    this.calculateGrandTotal();
    // this.Products = this.productsService.gettingCart();
  }
  // deleteProduct() {
  //   console.log('deleting..');
  //   this.productsService.deleteProduct(this.Products.id);
  // }
  deleteProduct(id: string) {
    this.productsService.removeFromCart(id);
    this.ProductsList = this.productsService.gettingCart();
    this.calculateGrandTotal();
  }

  orders() {
    this.router.navigate([`orders`]);
  }
  removeFromCart(item: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // If the user confirmed
        const idx = this.ProductsList.indexOf(item);
        if (idx !== -1) {
          this.ProductsList.splice(idx, 1); // Remove item from the list
          this.productsService.removeFromCart(item.id); // Ensure removal from service
          this.calculateGrandTotal(); // Recalculate total after removing item
        }
      }
    });
  }

  loaditems() {
    this.router.navigate(['cart']);
  }
  // placeOrder() {
  //   const orderDetails = {
  //     items: this.ProductsList,
  //     total: this.Total,
  //     orderId: this.generateOrderId(),
  //     date: new Date().toLocaleString(),
  //   };

  placeOrder() {
    if (!this.authService.isLoggedIn) {
      // Redirect to login page if not logged in
      //localStorage.setItem('redirectUrl', '/cart');
      this.router.navigate(['/login']);
      return;
    }
    const orderDetails = {
      items: this.ProductsList,
      total: this.Total,
      orderId: this.generateOrderId(),
      date: new Date().toLocaleString(),
    };

    this.productsService
      .addOrder(orderDetails)
      .then((response) => {
        console.log('Order placed successfully:', response);
        this.snackBar.open('Order placed successfully!', 'Close', {
          duration: 2000, // Duration in milliseconds
          verticalPosition: 'bottom', // Position on the screen
          horizontalPosition: 'center', // Position on the screen
        });
        this.storeOrderHistory(orderDetails);
        this.productsService.clearCart();
        this.ProductsList = []; // Clear the local ProductsList
        this.Total = 0; // Reset the total
        this.router.navigate(['/orders'], { state: { orderDetails } });
      })
      .catch((error) => {
        console.error('Error placing order:', error);
      });
  }
  storeOrderHistory(orderDetails: any) {
    let orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    orderHistory.push(orderDetails);
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
  }

  id: number = 1;
  generateOrderId() {
    return (this.id += 1);
  }
}
