import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CartService } from '../../services/cart.service';
import { ProductsService, Product } from '../../services/products.service';
import { QueryDocumentSnapshot, DocumentData } from '@angular/fire/firestore';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null = null;
  hasMore = true;
  loading = false;

  constructor(
    private cartService: CartService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.loadInitialProducts();
  }

  loadInitialProducts(): void {
    this.loading = true;
    this.productsService.getInitialProducts().then((snapshot) => {
      this.products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      this.lastDoc = snapshot.docs[snapshot.docs.length - 1] || null;
      this.hasMore = snapshot.docs.length === 6;
      this.loading = false;
    });
  }

  loadMoreProducts(): void {
    if (!this.lastDoc) return;

    this.loading = true;
    this.productsService.getNextProducts(this.lastDoc).then((snapshot) => {
      const newProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];

      this.products = [...this.products, ...newProducts];
      this.lastDoc = snapshot.docs[snapshot.docs.length - 1] || null;
      this.hasMore = snapshot.docs.length === 6;
      this.loading = false;
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
