import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Product
    {
      id: number;
      name: string;
      price: number;
    };

let ccount: number = 0;

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent {
  constructor(private router: Router) {
  }

  ccount = ccount;

  ngOnInit(): void {
    this.updateCartCount();
  }

  logout(): void {
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
  }

}