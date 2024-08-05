import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  orders: any[] = [];

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}
  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.productsService.getOrdersP().then((orders) => {
      this.orders = orders.reverse();
    });
  }
}
