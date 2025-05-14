import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import {
  Firestore,
  doc,
  setDoc,
  serverTimestamp,
} from '@angular/fire/firestore';
import { UserCredential } from 'firebase/auth';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  async registerUser(email: string, password: string): Promise<UserCredential> {
    const userCredential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    const user = userCredential.user;
    const userDocRef = doc(this.firestore, 'users', user.uid);
    await setDoc(userDocRef, {
      email: user.email,
      role: 'user',
      createdAt: serverTimestamp(),
    });

    return userCredential;
  }
}
