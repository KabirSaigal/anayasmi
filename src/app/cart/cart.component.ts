import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  name: string;
  price: number;
}


@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cart: Product[] = [];

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.cart = navigation.extras.state['cart'];
    }
  }


showNav = true;

  ngOnInit(): void {
    console.log("Cart items:", this.cart);
    console.log(screen.availWidth);
    const updateNavVisibility = () => {
      this.showNav = screen.width >= 600;
    };

    updateNavVisibility();

    window.addEventListener('resize', updateNavVisibility);
  }

}