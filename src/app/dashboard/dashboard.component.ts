import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../auth.guard';

let ccount: number = 0;


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, CommonModule, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent {
  constructor(private router: Router) {
  }

  ccount = ccount;

  ngOnInit(): void {
    this.updateCartCount();
    this.checkRole();
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  products: Product[] = [
    {id: 1,
      name: 'Grand Theft Auto V',
      price: 99.99
    },
    {id: 2,
      name: 'Spiderman 2',
      price: 39.99
    },
    {id: 3,
      name: 'Black Ops 6',
      price: 39.99
    }
  ];


  isCartPanelOpen: boolean = false;
  cart: Product[] = [];

  addToCart(item:Product): void {
    console.log("Adding to cart");
    this.cart.push(item);
    this.updateCartCount();
  }

  removeFromCart(item:Product): void {
    this.cart = this.cart.filter(i => i !== item);
    this.updateCartCount();
  }

  total(): number {
    return this.cart.reduce((acc, item) => acc + item.price, 0);
  }

  getProduct(id: number): Product {
    const product = this.products.find(p => p.id === id);
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    return product;
  }

  updateCartCount(): void {
    this.ccount = this.cart.length;
    console.log(this.cart);
  }
  
  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  toggleCartPanel(): void {
    this.isCartPanelOpen = !this.isCartPanelOpen;
  }

  closeCartPanel(): void {
    this.isCartPanelOpen = false;
  }

  isAdmin: boolean = false;

  checkRole() {
    const localData = localStorage.getItem('currentUser');
    if (localData != null) {
      const user = JSON.parse(localData);
      if (user.role === 'admin') {
      this.isAdmin = true;
      }
    }
  }

}