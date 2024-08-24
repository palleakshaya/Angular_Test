import { Injectable } from '@angular/core';
import { API } from './global';

export interface SignupUser {
  username: string;
  password: string;
  cpassword: string; // Ensure this matches what the backend expects
}

export interface SignupResponse {
  username: string;
  roleId: string;
  msg: string;
  token: string; // Token if provided upon successful signup
}

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor() {}
  signup(userData: SignupUser): Promise<SignupResponse> {
    return fetch(`${API}/users/signup`, {
      // Replace with your actual signup API endpoint
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-type': 'application/json',
      },
    }).then((res) => res.json());
  }
}
