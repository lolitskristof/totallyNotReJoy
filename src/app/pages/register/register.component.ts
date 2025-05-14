import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  hidePassword = true;
  hideConfirmPassword = true;
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  get email() {
    return this.registerForm.get('email')!;
  }

  get password() {
    return this.registerForm.get('password')!;
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword')!;
  }

  passwordsMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    return group.get('password')?.value === group.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  async onRegister(): Promise<void> {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      try {
        await this.userService.registerUser(email, password);

        this.snackBar.open('Sikeres regisztráció!', 'Bezárás', {
          duration: 3000,
        });

        window.location.href = '/login';
      } catch (error: any) {
        this.snackBar.open('Hiba: ' + error.message, 'Ok', {
          duration: 5000,
        });
      }
    }
  }
}
