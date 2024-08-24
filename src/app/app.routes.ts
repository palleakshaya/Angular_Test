import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { HomeComponent } from './home/home.component';
import { Component } from '@angular/core';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { SignupComponent } from './signup/signup.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { AddressDetailsComponent } from './address-details/address-details.component';
import { EditproductComponent } from './editproduct/editproduct.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'login', component: LoginComponent },

  {
    path: 'products',
    children: [
      { path: '', component: ProductListComponent },
      {
        path: ':id',
        component: ProductDetailsComponent,
      },
    ],
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [authGuard],
  },
  { path: 'signup', component: SignupComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'address-details', component: AddressDetailsComponent },
  { path: 'editproduct/:id', component: EditproductComponent },
];
