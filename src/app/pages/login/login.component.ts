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
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hidePassword = true;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      try {
        await this.authService.login(
          this.loginForm.value.email,
          this.loginForm.value.password
        );

        this.snackBar.open('Sikeres bejelentkezés!', 'Bezárás', {
          duration: 3000,
        });

        await new Promise((resolve) => setTimeout(resolve, 300));

        const userRole = this.authService.userRole;
        if (userRole === 'admin') {
          await this.router.navigate(['/admin']);
        } else {
          await this.router.navigate(['/']);
        }
      } catch (error: any) {
        this.snackBar.open(
          error.message || 'Hiba történt a bejelentkezés során!',
          'Bezárás',
          {
            duration: 5000,
          }
        );
      }
    }
  }
}
