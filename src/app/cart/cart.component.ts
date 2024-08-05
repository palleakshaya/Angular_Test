import { Component, Input } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatCardModule, CurrencyPipe],
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
    private router: Router
  ) {
    this.ProductsList = productsService.CartData;
    this.calculateGrandTotal();
  }

  calculateGrandTotal() {
    this.Total = this.ProductsList.reduce(
      (total: number, item: { price: string; quantity: number }) => {
        return total + parseFloat(item.price) * item.quantity;
      }
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
    this.Products = this.ProductsList[0];
    // this.Products = this.productsService.gettingCart();
  }
  // deleteProduct() {
  //   console.log('deleting..');
  //   this.productsService.deleteProduct(this.Products.id);
  // }
  deleteProduct(id: string) {
    this.productsService.removeFromCart(id);
    this.ProductsList = this.productsService.gettingCart();
  }

  orders() {
    this.router.navigate([`orders`]);
  }
  removeFromCart(item: any) {
    const idx = this.ProductsList.indexOf(item);
    return this.ProductsList.splice(idx, 1);
    this.loaditems();
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
        this.router.navigate(['/orders'], { state: { orderDetails } });
      })
      .catch((error) => {
        console.error('Error placing order:', error);
      });
  }
  id: number = 1;
  generateOrderId() {
    return (this.id += 1);
  }
}
