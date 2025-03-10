import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router: Router
  ) { }

  login(): void {
    let username = document.getElementById('email') as HTMLInputElement;
    let password = document.getElementById('password') as HTMLInputElement;

    if (!username || !password) {
      alert('Please enter username and password');
      return;
    }

    if (username.value === 'admin' && password.value === 'admin') {
      this.router.navigate(['/dashboard']);
    } else {
      alert('Login Failed');
    }
  }
}
