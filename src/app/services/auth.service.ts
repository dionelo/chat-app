import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: Observable<firebase.User | null>;
  private authState: any;
  errorMessage!: string;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private database: AngularFireDatabase,
    private router: Router
  ) {
    this.user = firebaseAuth.authState;
  }

  authUser(): Observable<firebase.User | null> {
    return this.user;
  }

  get currentUserId(): string {
    return this.authState !== null ? this.authState.user.uid : '';
  }

  async register(
    email: string,
    password: string,
    displayName: string
  ): Promise<void> {
    await this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        const status = 'online';
        this.setUserData(email, displayName, status);
        this.router.navigate(['chat']);
      })
      .catch((error) => {
        this.errorHandler(error);
      });
  }

  async login(email: string, password: string): Promise<void> {
    await this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        const status = 'online';
        this.setUserStatus(status);
        this.router.navigate(['chat']);
      })
      .catch((error) => {
        this.errorHandler(error);
      });
  }

  logout(): void {
    this.firebaseAuth.signOut()
    .then(() => {
      const status = 'offline';
      this.setUserStatus(status);
      this.router.navigate(['login']);
    });
  }

  setUserData(email: string, displayName: string, status: string): void {
    const path = `users/${this.currentUserId}`;
    const data = {
      email,
      displayName,
      status,
    };
    this.database
      .object(path)
      .update(data)
      .catch((err) => console.log(err));
  }

  setUserStatus(status: string): void {
    const path = `users/${this.currentUserId}`;
    const data = { status };
    this.database
      .object(path)
      .update(data)
      .catch((error) => console.log(error));
  }

  errorHandler(error: any): void {
    switch (error.code) {
      case 'auth/invalid-email':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
      case 'auth/email-already-in-use':
      case 'auth/operation-not-allowed': {
        this.errorMessage = 'Wrong email address or password.';
        break;
      }
      case 'auth/user-disabled':
      case 'user-disabled': {
        this.errorMessage = 'This account is disabled';
        break;
      }
      case 'auth/weak-password': {
        this.errorMessage = 'The password is too weak';
        break;
      }
    }
  }
}
