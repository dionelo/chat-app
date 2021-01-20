import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/database';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { ChatMessage } from '../models/chat-message.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  user!: firebase.User;
  chatMessages!: AngularFireList<ChatMessage>;
  chatMessage!: ChatMessage;
  username!: Observable<string>;

  constructor(
    private database: AngularFireDatabase,
    private firebaseAuth: AngularFireAuth
  ) {
    this.firebaseAuth.authState.subscribe((auth) => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }

      this.getUser().valueChanges().subscribe((user: any) => {
         this.username = user.displayName;
      });
    });
  }

  getUser(): AngularFireObject<any> {
    const userId = this.user.uid;
    const path = `/users/${userId}`;
    return this.database.object(path);
  }

  getUsers(): AngularFireList<any> {
    const path = '/users';
    return this.database.list(path);
  }

  sendMessage(message: string): void {
    const timeStamp = this.getTimeStamp();
    const email = this.user.email;
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message,
      timeSent: timeStamp,
      username: this.username || null,
      email,
    });
    console.log('Called send message');
  }

  getMessages(): AngularFireList<ChatMessage> {
    return this.database.list('messages', (ref) =>
      ref.limitToLast(25).orderByKey()
    );
  }

  getMessagesForFeed(): Observable<ChatMessage[]> {
    return this.database
      .list<ChatMessage>('messages', (ref) => ref.orderByKey().limitToLast(25))
      .valueChanges();
  }

  getTimeStamp(): string {
    const now = new Date();
    const date = `${now.getUTCFullYear()}/${now.getUTCMonth()+1}/${now.getUTCDay()}`;
    const time = `${now.getUTCHours()}:${now.getUTCMinutes()}:${now.getUTCSeconds()}`;
    return date + ' ' + time;
  }
}
