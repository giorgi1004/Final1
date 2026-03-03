import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Phone } from '../services/phone';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  static searchText: string = '';
  static cartItems: any[] = []; 
  isCartOpen = false;
  isUserMenuOpen = false; 

  public phoneService = inject(Phone);
  private router = inject(Router);

  get currentSearch() { return Header.searchText; }
  get cartList() { return Header.cartItems; }
  
get totalCount() {
  return Header.cartItems.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
}


get totalPrice() {
  return Header.cartItems.reduce((sum: number, item: any) => {
    return sum + ((item.price || 0) * (item.quantity || 1));
  }, 0);
}
 

  get displayUserName(): string {
    const user = this.phoneService.currentUser;
    if (!user) return '';
    return user.username || user.name || user.role || 'User';
  }

  onInput(val: string) { 
    Header.searchText = val.toLowerCase().trim(); 
  }

  onSearch(val: string) { 
    Header.searchText = val.toLowerCase().trim(); 
    this.router.navigate(['/']); 
  }

  resetSearch() {
    Header.searchText = '';
    this.router.navigate(['/']);
  }

  goToCartPage() { 
    this.router.navigate(['/cart']); 
  }
 
  logout() {
    this.phoneService.currentUser = null;
    this.isUserMenuOpen = false;
    this.router.navigate(['/login']);
  }

  removeFromCart(index: number) {
    Header.cartItems.splice(index, 1);
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  
}






