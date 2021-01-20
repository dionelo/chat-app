import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatMessage } from '../models/chat-message.model';

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

  constructor() {}

  ngOnInit(chatMessage = this.chatMessage): void {
    this.messageContent = chatMessage.message;
    this.timeStamp = chatMessage.timeSent;
    this.userEmail = chatMessage.email;
    this.username = chatMessage.username;
  }
}
