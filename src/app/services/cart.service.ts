import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  Firestore,
  collection,
  addDoc,
  serverTimestamp,
} from '@angular/fire/firestore';

export interface CartItem {
  name: string;
  price: number;
}

export interface OrderDetails {
  customerName: string;
  email: string;
  address: string;
  phone: string;
  comment?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private itemsSubject = new BehaviorSubject<CartItem[]>([]);
  items$ = this.itemsSubject.asObservable();

  constructor(private firestore: Firestore) {
    const stored = localStorage.getItem('cart_items');
    if (stored) {
      this.itemsSubject.next(JSON.parse(stored));
    }
  }

  addToCart(item: CartItem) {
    const current = this.itemsSubject.value;
    const updated = [...current, item];
    this.itemsSubject.next(updated);
    localStorage.setItem('cart_items', JSON.stringify(updated));
  }

  getItems(): CartItem[] {
    return this.itemsSubject.value;
  }

  clearCart() {
    this.itemsSubject.next([]);
    localStorage.removeItem('cart_items');
  }

  async submitOrder(details: OrderDetails): Promise<void> {
    const items = this.getItems();

    if (items.length === 0) {
      throw new Error('A kosár üres.');
    }

    const total = items.reduce((sum, item) => sum + item.price, 0);

    const orderData = {
      customerName: details.customerName,
      email: details.email,
      phone: details.phone,
      address: details.address,
      comment: details.comment || '',
      items: items.map((item) => item.name),
      total,
      status: 'Függőben',
      createdAt: serverTimestamp(),
    };

    const ordersRef = collection(this.firestore, 'orders');
    await addDoc(ordersRef, orderData);
    this.clearCart();
  }
}
