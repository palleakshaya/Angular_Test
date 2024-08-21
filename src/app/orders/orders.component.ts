import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  orderHistory: any[] = [];

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}
  // ngOnInit() {
  //   this.getOrders();
  // }

  // getOrders() {
  //   this.productsService.getOrdersP().then((orders) => {
  //     this.orders = orders.reverse();
  //   });
  // }
  ngOnInit() {
    this.orderHistory = this.getOrderHistory();
    this.orderHistory.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  getOrderHistory(): any[] {
    return JSON.parse(localStorage.getItem('orderHistory') || '[]');
  }
}
