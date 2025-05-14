import { Injectable, inject } from '@angular/core';
import {
  Auth,
  authState,
  signInWithEmailAndPassword,
  User,
} from '@angular/fire/auth';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { UserCredential } from 'firebase/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  user$: Observable<User | null> = authState(this.auth);

  role$: Observable<string | null> = this.user$.pipe(
    switchMap((user) => {
      if (!user) return of(null);
      const ref = doc(this.firestore, 'users', user.uid);
      return docData(ref).pipe(map((data: any) => data?.role || null));
    })
  );

  currentUserRole: string | null = null;

  constructor() {
    this.role$.subscribe((role) => {
      this.currentUserRole = role;
    });
  }

  async login(email: string, password: string): Promise<UserCredential> {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  async logout(): Promise<void> {
    await this.auth.signOut();
    window.location.href = '/';
  }

  get isLoggedIn(): boolean {
    return this.auth.currentUser !== null;
  }
}
