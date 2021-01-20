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

  login(email: string, password: string): Promise<void> {
    return this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        const status = 'online';
        this.setUserStatus(status);
        this.router.navigate(['chat']);
      });
  }

  logout(): void {
    this.firebaseAuth.signOut();
    this.router.navigate(['login']);
  }

  register(
    email: string,
    password: string,
    displayName: string
  ): Promise<void> {
    return this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        console.log(this.authState.user);
        const status = 'online';
        this.setUserData(email, displayName, status);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setUserData(email: string, displayName: string, status: string): void {
    const path = `users/${this.currentUserId}`;
    const data = {
      email,
      displayName,
      status,
    };
    console.log(data);

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
}
