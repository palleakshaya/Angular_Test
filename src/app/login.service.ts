import { Injectable } from '@angular/core';
import { API } from './global';
export interface User {
  username: string;
  password: string;
}
export interface TokenResponse {
  msg: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor() {}
  login(credentials: User): Promise<TokenResponse> {
    return fetch(`${API}/users/login`, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-type': 'application/json',
      },
    }).then((res) => res.json());
  }
}
