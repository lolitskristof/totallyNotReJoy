import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  Timestamp,
  DocumentData,
  deleteDoc,
  doc,
  addDoc,
  serverTimestamp,
  updateDoc,
  orderBy,
  limit,
  startAfter,
  getDocs,
  query,
  QueryDocumentSnapshot,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  createdAt: Timestamp;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly PAGE_SIZE = 6;

  constructor(private firestore: Firestore) {}

  getProducts(): Observable<Product[]> {
    const productsRef = collection(this.firestore, 'products');
    return collectionData(productsRef, { idField: 'id' }) as Observable<
      Product[]
    >;
  }

  getInitialProducts() {
    const ref = collection(this.firestore, 'products');
    const q = query(ref, orderBy('createdAt', 'desc'), limit(this.PAGE_SIZE));
    return getDocs(q);
  }

  // 🔄 Új: következő oldal lekérdezése
  getNextProducts(lastDoc: QueryDocumentSnapshot<DocumentData>) {
    const ref = collection(this.firestore, 'products');
    const q = query(
      ref,
      orderBy('createdAt', 'desc'),
      startAfter(lastDoc),
      limit(this.PAGE_SIZE)
    );
    return getDocs(q);
  }

  deleteProduct(id: string): Promise<void> {
    const productRef = doc(this.firestore, 'products', id);
    return deleteDoc(productRef);
  }

  addProduct(product: Omit<Product, 'id' | 'createdAt'>): Promise<void> {
    const productsRef = collection(this.firestore, 'products');
    return addDoc(productsRef, {
      ...product,
      createdAt: serverTimestamp(),
    }).then(() => {});
  }

  updateProduct(id: string, data: Partial<Product>): Promise<void> {
    const productRef = doc(this.firestore, 'products', id);
    return updateDoc(productRef, data);
  }
}
