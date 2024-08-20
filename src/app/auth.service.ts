import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    // const token = this.getToken();
    // // Add token validation logic here if needed
    // return !!token;
    return !!localStorage.getItem('token');
  }
}
