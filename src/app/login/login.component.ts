import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  private router = inject(Router);
  private http = inject(HttpClient);

  login() {
    this.http.post<{ token: string }>('http://localhost:3000/auth/login', {
      username: this.username,
      password: this.password
    }).subscribe(
      response => {
        console.log('Login Response:', response);
        sessionStorage.setItem('authToken', response.token);
        sessionStorage.setItem('username', this.username);

        this.router.navigate(['/home']).then(() => {
          console.log("Navigation successful!");
        }).catch(err => console.error("Navigation failed!", err));
      },
      error => {
        console.error('Login Error:', error);
        this.errorMessage = 'Invalid username or password!';
      }
    );
  }
}
