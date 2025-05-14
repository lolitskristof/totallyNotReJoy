import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  doc,
  updateDoc,
  DocumentReference,
  QueryDocumentSnapshot,
  DocumentData,
  Timestamp,
} from '@angular/fire/firestore';

export interface Order {
  id: string;
  customerName: string;
  items: string[];
  total: number;
  status: 'Függőben' | 'Feldolgozva';
  phone: string;
  email: string;
  comment?: string;
  address: string;
  createdAt: Timestamp;
}

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private readonly PAGE_SIZE = 5;

  constructor(private firestore: Firestore) {}

  async getInitialOrders() {
    const ordersRef = collection(this.firestore, 'orders');
    const q = query(
      ordersRef,
      orderBy('createdAt', 'desc'),
      limit(this.PAGE_SIZE)
    );
    return await getDocs(q);
  }

  async getNextOrders(lastDoc: QueryDocumentSnapshot<DocumentData>) {
    const ordersRef = collection(this.firestore, 'orders');
    const q = query(
      ordersRef,
      orderBy('createdAt', 'desc'),
      startAfter(lastDoc),
      limit(this.PAGE_SIZE)
    );
    return await getDocs(q);
  }

  updateOrderStatus(
    id: string,
    newStatus: 'Függőben' | 'Feldolgozva'
  ): Promise<void> {
    const orderRef: DocumentReference = doc(this.firestore, 'orders', id);
    return updateDoc(orderRef, { status: newStatus });
  }
}
