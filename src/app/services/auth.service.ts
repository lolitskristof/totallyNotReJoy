import { Injectable, inject } from '@angular/core';
import {
  Auth,
  authState,
  signInWithEmailAndPassword,
  User,
} from '@angular/fire/auth';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, map, take } from 'rxjs/operators';
import { UserCredential } from 'firebase/auth';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);

  user$: Observable<User | null> = authState(this.auth);

  role$: Observable<string | null> = this.user$.pipe(
    switchMap((user) => {
      if (!user) {
        localStorage.removeItem('userRole');
        return of(null);
      }
      const ref = doc(this.firestore, 'users', user.uid);
      return docData(ref).pipe(
        map((data: any) => {
          const role = data?.role || null;
          if (role) {
            localStorage.setItem('userRole', role);
          } else {
            localStorage.removeItem('userRole');
          }
          return role;
        })
      );
    })
  );

  currentUserRole: string | null = null;

  constructor() {
    this.role$.subscribe((role) => {
      this.currentUserRole = role;
    });
  }

  async login(email: string, password: string): Promise<UserCredential> {
    const credential = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    try {
      await new Promise<void>((resolve, reject) => {
        docData(doc(this.firestore, 'users', credential.user.uid))
          .pipe(take(1))
          .subscribe({
            next: (data: any) => {
              if (data?.role) {
                localStorage.setItem('userRole', data.role);
                this.currentUserRole = data.role;
              }
              resolve();
            },
            error: reject,
          });
      });
    } catch (error) {
      console.error('Error getting user role:', error);
    }

    return credential;
  }

  async logout(): Promise<void> {
    try {
      localStorage.removeItem('userRole');
      this.currentUserRole = null;
      await this.auth.signOut();
      await this.router.navigate(['/']);
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  }

  get isLoggedIn(): boolean {
    return this.auth.currentUser !== null;
  }

  get userRole(): string | null {
    return localStorage.getItem('userRole') || this.currentUserRole;
  }
}
