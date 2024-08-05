import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { HomeComponent } from './home/home.component';
import { Component } from '@angular/core';
import { ProductDetailsComponent } from './product-details/product-details.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
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
];
