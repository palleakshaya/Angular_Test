import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from './global';
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
export interface TokenResponse {
  msg: string;
  token: string;
  username: string;
  roleId: string;
}
export interface User {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  CartData: any = [];
  constructor(private http: HttpClient) {}
  // API = 'https://66b0acdd6a693a95b539ba20.mockapi.io';
  // http: any;
  //const API = "https://66b0acdd6a693a95b539ba20.mockapi.io/Products"
  // getProductsByid(bookId: string): Promise<IBook> {
  //   return fetch(`${API}/products/${bookId}`, {
  //     method: 'GET',
  //     headers: {
  //       'x-auth-token': localStorage.getItem('token') as string,
  //     },
  //   }).then((res) => {
  //     if (res.status != 200) {
  //       throw res.json();
  //     }
  //     return res.json();
  //   });
  // }
  getProductsByid(id: string): Promise<IBook> {
    return fetch(`${API}/products/${id}`).then((res) => res.json());
  }
  // getProductsByid(bookId: string): Promise<IBook> {
  //   return new Promise((resolve, reject) => {
  //     const product = this.CartData.find(
  //       (item: { id: string }) => item.id === bookId
  //     );
  //     if (product) {
  //       resolve(product);
  //     } else {
  //       reject('Product not found');
  //     }
  //   });
  // }
  getProducts() {
    return fetch(`${API}/products`).then((res) => res.json());
  }
  searchUser(searchTerm: string) {
    console.log('search Infrontend:', searchTerm);
    return this.http.get<IBook[]>(`${API}/products?search=${searchTerm}`);
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
  addProduct(product: IBook) {
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
  deleteProduct(bookId: string): Promise<any> {
    return fetch(`${API}/products/${bookId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token') as string, // Include token if needed
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      return response.json();
    });
  }

  getOrdersP(): Promise<any> {
    return fetch(`${API}/orders`).then((res) => res.json());
  }
  postOrderToApi(orderDetails: any): Promise<any> {
    return fetch(`${API}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token') as string,
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

  addNewProduct(product: IBook): Observable<IBook> {
    return this.http.post<IBook>(`${API}/products`, product, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token') as string,
      },
    });
  }
  updateProduct(bookId: string, product: IBook): Promise<IBook> {
    return fetch(`${API}/products/${bookId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token') as string, // Include token if needed
      },
      body: JSON.stringify(product),
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Failed to update product');
      }
      return response.json(); // Return the updated product data
    });
  }
}
