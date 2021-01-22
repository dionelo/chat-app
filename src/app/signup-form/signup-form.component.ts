import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css', '../shared/formValidation.css'],
})
export class SignupFormComponent {
  email!: string;
  password!: string;
  confirmPassword!: string;
  displayName!: string;

  regularExpressions = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  };

  constructor(private authService: AuthService, private router: Router) {}

  get errorMessage(): string {
    return this.authService.errorMessage;
  }

  signup(): void {
    const email = this.email;
    const password = this.password;
    const displayName = this.displayName;
    this.authService.register(email, password, displayName);
  }
}
