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
  addingCart(product: any) {
    // this.movies.push(newMovie);
    this.CartData.push(product);
  }
  gettingCart() {
    return this.CartData;
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
