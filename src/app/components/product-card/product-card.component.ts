import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PriceFormatPipe } from '../../price-format.pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, PriceFormatPipe],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() name!: string;
  @Input() price!: number;
  @Input() brand!: string;
  @Input() imageUrl!: string;

  @Output() add = new EventEmitter<void>();

  onAdd() {
    this.add.emit();
  }
}
