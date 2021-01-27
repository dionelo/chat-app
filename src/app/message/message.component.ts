import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatMessage } from '../models/chat-message.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  @Input()
  chatMessage!: ChatMessage;
  userEmail?: string | null;
  username?: Observable<string>;
  messageContent?: string;
  timeStamp?: string | Date = new Date();
  isOwnMessage?: boolean;
  ownEmail?: string | null;

  constructor(private authService: AuthService) {
    authService.authUser().subscribe(user => {
      this.ownEmail = user?.email;
      this.isOwnMessage = this.ownEmail === this.userEmail;
    });
  }

  ngOnInit(chatMessage = this.chatMessage): void {
    this.messageContent = chatMessage.message;
    this.timeStamp = chatMessage.timeSent;
    this.userEmail = chatMessage.email;
    this.username = chatMessage.username;
  }
}
