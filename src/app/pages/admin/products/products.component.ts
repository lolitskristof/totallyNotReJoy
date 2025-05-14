import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductsService, Product } from '../../../services/products.service';
import { DeleteConfirmationDialog } from '../../../components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { AddProductDialog } from '../../../components/add-product-dialog/add-product-dialog.component';
import { EditProductDialog } from '../../../components/edit-product-dialog/edit-product-dialog.component';
import { PriceFormatPipe } from '../../../price-format.pipe';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatFormFieldModule,
    PriceFormatPipe,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  loading = true;

  selectedBrand: string = 'all';
  sortOrder: 'asc' | 'desc' = 'asc';

  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((data) => {
      this.products = data;
      this.loading = false;
    });
  }

  get brands(): string[] {
    const uniqueBrands = new Set(this.products.map((p) => p.brand));
    return Array.from(uniqueBrands);
  }

  get filteredProducts(): Product[] {
    let filtered = [...this.products];

    if (this.selectedBrand !== 'all') {
      filtered = filtered.filter((p) => p.brand === this.selectedBrand);
    }

    filtered.sort((a, b) =>
      this.sortOrder === 'asc' ? a.price - b.price : b.price - a.price
    );

    return filtered;
  }

  editProduct(product: Product): void {
    const dialogRef = this.dialog.open(EditProductDialog, {
      width: '90vw',
      maxWidth: '600px',
      data: product,
    });

    dialogRef.afterClosed().subscribe((updatedProduct: Product) => {
      if (updatedProduct && updatedProduct.id) {
        this.productsService
          .updateProduct(updatedProduct.id, updatedProduct)
          .then(() => {
            this.snackBar.open('Termék frissítve.', 'Bezárás', {
              duration: 3000,
            });
          })
          .catch(() => {
            this.snackBar.open('Hiba történt a frissítés során.', 'Ok', {
              duration: 4000,
            });
          });
      }
    });
  }

  deleteProduct(product: Product): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialog);

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed && product.id) {
        this.productsService
          .deleteProduct(product.id)
          .then(() => {
            this.snackBar.open('Termék törölve.', 'Bezárás', {
              duration: 3000,
            });
          })
          .catch((error) => {
            console.error('Törlési hiba:', error);
            this.snackBar.open('Hiba történt a törlés során.', 'Ok', {
              duration: 4000,
            });
          });
      }
    });
  }

  openAddProductDialog(): void {
    const dialogRef = this.dialog.open(AddProductDialog, {
      width: '90vw',
      maxWidth: '95vw',
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.productsService
          .addProduct(data)
          .then(() => {
            this.snackBar.open('Termék hozzáadva.', 'Bezárás', {
              duration: 3000,
            });
          })
          .catch(() => {
            this.snackBar.open('Hiba történt a mentés során.', 'Ok', {
              duration: 4000,
            });
          });
      }
    });
  }
}
