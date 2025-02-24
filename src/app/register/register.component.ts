import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule] // ✅ Added RouterModule
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  private http = inject(HttpClient);
  private router = inject(Router);

  register() {
    if (!this.username || !this.password) {
      this.errorMessage = 'All fields are required!';
      return;
    }

    const user = { username: this.username, password: this.password };

    this.http.post('http://localhost:3000/auth/register', user)
      .subscribe({
        next: (response: any) => {
          this.successMessage = 'Registration successful! Redirecting to login...';
          this.errorMessage = '';
          setTimeout(() => this.router.navigate(['/login']), 2000);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Something went wrong!';
          this.successMessage = '';
        }
      });
  }
}
