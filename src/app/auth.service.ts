import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private roleId = 1;
  constructor(private router: Router) {}
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  setRoleId(roleId: number) {
    localStorage.setItem('roleId', roleId.toString());
  }

  isLoggedIn(): boolean {
    // const token = this.getToken();
    // // Add token validation logic here if needed
    // return !!token;
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    const roleIdStr = localStorage.getItem('roleId');
    const roleId = roleIdStr ? Number(roleIdStr) : 1;
    return roleId === 0; // Return true if the role is 0 (admin)
  }
  logout() {
    // Remove token and other user data from storage
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('roleId');

    // Redirect user to login page or home page
    this.router.navigate(['/login']);
  }
}
