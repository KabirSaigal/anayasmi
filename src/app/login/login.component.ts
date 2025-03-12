import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from '../auth.guard';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router: Router) { }

  showregister: boolean = false;

  user: any = {
    name: '',
    password: '',
    email: '',
    role: 'user'
  };

  userlogin: any = {
    password: '',
    email: '',
    role: 'user'
  };

  admin: any = {
    name: 'admin',
    password: 'admin',
    email: 'admin',
    role: 'admin'
  }

  currentUser: any = {
    name: '',
    password: '',
    email: '',
    role: ''
  }

  ngOnInit() {
    const localArray = [];
      localArray.push(this.admin);
      localStorage.setItem('users', JSON.stringify(localArray));
  }

  register(): void {
    const isLocalData = localStorage.getItem('users');
    if(isLocalData != null) {
      const localArray = JSON.parse(isLocalData);
      const userExists = localArray.find((m:any) => m.email === this.user.email);
      if (userExists != undefined) {
        alert('User already exists');
      } else {
        localArray.push(this.admin);
        localArray.push(this.user);
        localStorage.setItem('users', JSON.stringify(localArray));
        this.hideRegister();
      }
    } else {
      const localArray = [];
      localArray.push(this.admin);
      localArray.push(this.user);
      localStorage.setItem('users', JSON.stringify(localArray));
      this.hideRegister();
  }
}

  showRegister(): void {
    this.showregister = true;
  }

  hideRegister(): void {
    this.showregister = false;
  }

  login(): void {
    const isLocalData = localStorage.getItem('users');
    if (isLocalData != null) {
      const users = JSON.parse(isLocalData);
      const adminExists = users.find((m:any) => m.email === this.userlogin.email && m.password === this.userlogin.password && m.role === 'admin');
      const userExists = users.find((m:any) => m.email === this.userlogin.email && m.password === this.userlogin.password && m.role === 'user');
      if (userExists != undefined || adminExists != undefined) {
        if (adminExists) {
          this.currentUser = adminExists;
        } else if (userExists) {
          this.currentUser = userExists;
        }
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        this.router.navigate(['/dashboard']);
        AuthGuard.prototype.login();
      } else {
        alert('Invalid credentials');
      }
    }else {
      alert('Invalid credentials');
    }
  }
}