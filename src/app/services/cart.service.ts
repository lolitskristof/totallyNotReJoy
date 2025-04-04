import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  name: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private itemsSubject = new BehaviorSubject<CartItem[]>([]);
  items$ = this.itemsSubject.asObservable();

  addToCart(item: CartItem) {
    const current = this.itemsSubject.value;
    this.itemsSubject.next([...current, item]);
  }

  getItems(): CartItem[] {
    return this.itemsSubject.value;
  }

  clearCart() {
    this.itemsSubject.next([]);
  }
}
