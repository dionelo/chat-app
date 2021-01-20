import { Observable } from 'rxjs';

export class ChatMessage {
    $key?: string;
    email?: string | null;
    username?: Observable<string>;
    message?: string;
    timeSent?: string | Date = new Date();
}
