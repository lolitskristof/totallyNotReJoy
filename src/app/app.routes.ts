import { Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./pages/products/products.component').then(
        (m) => m.ProductsComponent
      ),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./pages/cart/cart.component').then((m) => m.CartComponent),
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/admin/admin.component').then((m) => m.AdminComponent),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/admin/products/products.component').then(
            (m) => m.ProductsComponent
          ),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./pages/admin/orders/orders.component').then(
            (m) => m.OrdersComponent
          ),
      },
    ],
  },
  {
    path: 'order',
    loadComponent: () =>
      import('./pages/order/order.component').then((m) => m.OrderComponent),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
