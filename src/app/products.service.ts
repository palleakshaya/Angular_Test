import { Injectable } from '@angular/core';
export interface IBook {
  bookId: string;
  title: string;
  author: string;
  price: number;
  description: string;
  rating: number;
  category: string;
  imageURL: string;
  stock: number;
  qty: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  CartData: any = [];
  //const API = "https://66b0acdd6a693a95b539ba20.mockapi.io/Products"
  getProductsByid(bookId: string): Promise<IBook> {
    return fetch(
      `https://66b0acdd6a693a95b539ba20.mockapi.io/Products/${bookId}`
    ).then((res) => res.json());
  }
  getProducts() {
    return fetch('https://66b0acdd6a693a95b539ba20.mockapi.io/Products').then(
      (res) => res.json()
    );
  }
  // addProduct(product: any) {
  //   // this.movies.push(newMovie);
  //   // this.CartData.push(product);
  //   if (this.CartData.find((i: { id: any }) => product.id == i.id)) {
  //     const idx = this.CartData.indexOf(product);
  //     product.qty += 1;
  //   } else {
  //     this.CartData.push(product);
  //   }
  // }
  addProduct(product: any) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingProductIndex = cart.findIndex(
      (i: { bookId: any }) => product.bookId === i.bookId
    );

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].qty += 1; // Update quantity if the product is already in the cart
    } else {
      product.qty = 1; // Initialize quantity
      cart.push(product); // Add new product to cart
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to localStorage
  }

  gettingCart() {
    // return this.CartData;
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }

  removeFromCart(id: string) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart = cart.filter((item: { id: string }) => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  deleteProduct(id: any) {
    return fetch(
      `https://66b0acdd6a693a95b539ba20.mockapi.io/Products/${id} `,
      {
        method: 'DELETE',
      }
    ).then((res) => res.json());
  }
  getOrdersP(): Promise<any> {
    return fetch('https://66b0acdd6a693a95b539ba20.mockapi.io/Orders').then(
      (res) => res.json()
    );
  }
  postOrderToApi(orderDetails: any): Promise<any> {
    return fetch('https://66b0acdd6a693a95b539ba20.mockapi.io/Orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderDetails),
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  }
  orders: Array<any> = [];
  addOrder(orderDetails: any): Promise<any> {
    this.orders.push(orderDetails);
    return this.postOrderToApi(orderDetails);
  }
  clearCart() {
    localStorage.removeItem('cart');
  }
}
