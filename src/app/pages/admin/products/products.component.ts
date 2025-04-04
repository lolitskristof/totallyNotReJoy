import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  phones = [
    {
      name: 'iPhone 14 Pro',
      price: 589000,
      imageUrl:
        'https://p1.akcdn.net/full/1025523558.apple-iphone-14-pro-128gb.jpg',
    },
    {
      name: 'Samsung Galaxy S23',
      price: 439000,
      imageUrl:
        'https://p1.akcdn.net/full/1102028235.samsung-galaxy-s23-5g-128gb-8gb-ram-dual-sm-s911b.jpg',
    },
    {
      name: 'Xiaomi 13T',
      price: 289000,
      imageUrl:
        'https://p1.akcdn.net/full/1188129505.xiaomi-13t-5g-256gb-8gb-ram-dual.jpg',
    },
  ];

  editProduct(product: any) {
    console.log('Szerkesztés:', product);
    // TODO: megnyitni szerkesztő modált vagy route-ot
  }

  deleteProduct(product: any) {
    console.log('Törlés:', product);
    // TODO: valódi törlés logika
  }
}
