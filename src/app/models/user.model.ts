import { Observable } from "rxjs";

export class User {
    uid?: string;
    email?: string;
    username?: Observable<string>;
    password?: string;
    status!: string;
    displayName?: string;
}
