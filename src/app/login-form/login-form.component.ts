import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  email!: string;
  password!: string;
  errorMessage!: string;

  constructor(private authService: AuthService) {}

  login(): void {
    console.log('login() called from login-form component');
    this.authService
      .login(this.email, this.password)
      .catch((error) => (this.errorMessage = error.message));
  }
}
