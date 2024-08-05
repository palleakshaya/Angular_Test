import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  CartData: any = [];
  //const API = "https://66b0acdd6a693a95b539ba20.mockapi.io/Products"
  getProductsByid(id: string) {
    return fetch(
      `https://66b0acdd6a693a95b539ba20.mockapi.io/Products/${id}`
    ).then((res) => res.json());
  }
  getProducts() {
    return fetch('https://66b0acdd6a693a95b539ba20.mockapi.io/Products').then(
      (res) => res.json()
    );
  }
  addProduct(product: any) {
    // this.movies.push(newMovie);
    // this.CartData.push(product);
    if (this.CartData.find((i: { id: any }) => product.id == i.id)) {
      const idx = this.CartData.indexOf(product);
      product.qty += 1;
    } else {
      this.CartData.push(product);
    }
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
}
