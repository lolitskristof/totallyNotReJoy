import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
  ],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent {
  orders = [
    {
      id: 'ORD-001',
      customerName: 'Kiss Péter',
      items: ['iPhone 14 Pro', 'Xiaomi 13T'],
      total: 878000,
      status: 'Függőben',
      date: '2024-04-01',
    },
    {
      id: 'ORD-002',
      customerName: 'Nagy Anna',
      items: ['Samsung Galaxy S23'],
      total: 439000,
      status: 'Feldolgozva',
      date: '2024-03-30',
    },
  ];

  updateStatus(order: any, newStatus: string) {
    order.status = newStatus;
    console.log(`Rendelés (${order.id}) státusz frissítve: ${newStatus}`);
  }
}
