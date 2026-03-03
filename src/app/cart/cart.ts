import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../header/header';
import { Phone } from '../services/phone';
import { Router, RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
  public phoneService = inject(Phone);
  private router = inject(Router);

  get items(): any[] { 
    return Header.cartItems; 
  }

  get totalAmount(): number {
    return this.items.reduce((sum: number, item: any) => 
      sum + ((item.price || 0) * (item.quantity || 1)), 0);
  }

  get totalCount(): number {
    return this.items.reduce((sum: number, item: any) => 
      sum + (item.quantity || 1), 0);
  }

  remove(index: number) {
    Header.cartItems.splice(index, 1);
  }

  checkout() {
    Header.cartItems = []; 
    this.router.navigate(['/']); 
  }
}







