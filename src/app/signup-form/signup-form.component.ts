import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent {
  email!: string;
  password!: string;
  displayName!: string;
  errorMessage!: string;

  constructor(private authService: AuthService, private router: Router) {}

  signup(): void {
    const email = this.email;
    const password = this.password;
    const displayName = this.displayName;
    this.authService
      .register(email, password, displayName)
      .then((result: any) => {
        this.router.navigate(['chat']);
      })
      .catch((err: any) => {
        this.errorMessage = err.message;
      });
  }
}
