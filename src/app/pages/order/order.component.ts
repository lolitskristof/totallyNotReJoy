import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  standalone: true,
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class OrderComponent {
  orderForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router
  ) {
    this.orderForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      comment: [''],
    });
  }

  async onSubmit() {
    if (this.orderForm.valid) {
      try {
        await this.cartService.submitOrder({
          customerName: this.orderForm.value.name,
          email: this.orderForm.value.email,
          address: this.orderForm.value.address,
          phone: this.orderForm.value.phone,
          comment: this.orderForm.value.comment,
        });

        alert('Rendelés sikeresen elküldve!');
        this.orderForm.reset();
        this.router.navigate(['/']);
      } catch (error) {
        console.error('Rendelés hiba:', error);
        alert('Hiba történt a rendelés során. Próbáld újra!');
      }
    } else {
      this.orderForm.markAllAsTouched();
    }
  }
}
