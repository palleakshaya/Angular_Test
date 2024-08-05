import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
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
  addTocart(product: any) {
    // this.movies.push(newMovie);
    return fetch(`https://66b0acdd6a693a95b539ba20.mockapi.io/Products`, {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
  }
}
