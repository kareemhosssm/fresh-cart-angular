import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { BlankLayout } from './layouts/blank-layout/blank-layout';
import { authGuard } from './core/guards/auth-guard';
import { logedGuard } from './core/guards/loged-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: '',
    component: AuthLayout,
    canActivate: [logedGuard],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login').then((m) => m.Login),
        title: 'Login',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/register/register').then((m) => m.Register),
        title: 'Register',
      },
      {
        path: 'forgot',
        loadComponent: () =>
          import('./shared/components/forgotpassword/forgotpassword').then((m) => m.Forgotpassword),
        title: 'forgotpassword',
      },
    ],
  },

  {
    path: '',
    component: BlankLayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home').then((m) => m.Home),
        title: 'Home',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./pages/cart/cart').then((m) => m.CartComponent),
        title: 'Cart',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/products/products').then((m) => m.Products),
        title: 'Products',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./pages/allorders/allorders').then((m) => m.Allorders),
        title: 'allorders',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./pages/brands/brands').then((m) => m.Brands),
        title: 'Brands',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./pages/categories/categories').then((m) => m.Categories),
        title: 'Categories',
      },
      {
        path: 'checkout/:id',
        loadComponent: () =>
          import('./pages/checkout/checkout').then((m) => m.Checkout),
        title: 'Checkout',
      },
      {
        path:'details/:id',
        loadComponent: () =>
          import('./pages/details/details').then((m) => m.Details),
        title: 'Details',
      },
      {
        path: '**',
        loadComponent: () =>
          import('./pages/notfound/notfound').then((m) => m.Notfound),
        title: 'Not Found',
      },
    ],
  },
];
