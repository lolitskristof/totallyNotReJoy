import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'add-product-dialog',
  standalone: true,
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class AddProductDialog {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddProductDialog>
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      imageUrl: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
