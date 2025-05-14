import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../services/cart.service';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PriceFormatPipe } from '../../price-format.pipe';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
    PriceFormatPipe,
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  items: CartItem[] = [];
  total = 0;
  private subscription: Subscription | undefined;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.subscription = this.cartService.items$.subscribe((items) => {
      this.items = items;
      this.total = items.reduce((sum, item) => sum + item.price, 0);
    });
  }

  clearCart() {
    this.cartService.clearCart();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
