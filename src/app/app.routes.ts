import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductsComponent } from './pages/products/products.component';
import { CartComponent } from './pages/cart/cart.component';
import { AdminComponent } from './pages/admin/admin.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
  {
    path: 'admin',
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
];
