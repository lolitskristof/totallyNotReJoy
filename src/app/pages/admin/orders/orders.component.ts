import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { PriceFormatPipe } from '../../../price-format.pipe';
import { OrdersService, Order } from '../../../services/orders.service';
import { QueryDocumentSnapshot, DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatSelectModule,
    PriceFormatPipe,
  ],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null = null;
  hasMore = true;
  loading = false;

  filter: 'all' | 'Függőben' | 'Feldolgozva' = 'all';

  constructor(
    private ordersService: OrdersService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadInitialOrders();
  }

  get filteredOrders(): Order[] {
    if (this.filter === 'all') return this.orders;
    return this.orders.filter((order) => order.status === this.filter);
  }

  loadInitialOrders(): void {
    this.loading = true;
    this.ordersService.getInitialOrders().then((snapshot) => {
      this.orders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Order[];
      this.lastDoc = snapshot.docs[snapshot.docs.length - 1] || null;
      this.hasMore = snapshot.docs.length === 5;
      this.loading = false;
    });
  }

  loadMoreOrders(): void {
    if (!this.lastDoc) return;
    this.loading = true;
    this.ordersService.getNextOrders(this.lastDoc).then((snapshot) => {
      const newOrders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Order[];
      this.orders = [...this.orders, ...newOrders];
      this.lastDoc = snapshot.docs[snapshot.docs.length - 1] || null;
      this.hasMore = snapshot.docs.length === 5;
      this.loading = false;
    });
  }

  updateStatus(order: Order, newStatus: 'Függőben' | 'Feldolgozva'): void {
    if (!order.id) return;
    this.ordersService
      .updateOrderStatus(order.id, newStatus)
      .then(() => {
        this.snackBar.open('Státusz frissítve.', 'Bezárás', { duration: 3000 });
        order.status = newStatus;
      })
      .catch((err) => {
        console.error(err);
        this.snackBar.open('Hiba a frissítés során.', 'Ok', { duration: 4000 });
      });
  }
}
