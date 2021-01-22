import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css', '../shared/formValidation.css'],
})
export class LoginFormComponent {
  email!: string;
  password!: string;

  regularExpressions = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  };

  constructor(private authService: AuthService) {}

  get errorMessage(): string {
    return this.authService.errorMessage;
  }

  login(): void {
    const email = this.email;
    const password = this.password;
    this.authService.login(email, password);
  }
}
