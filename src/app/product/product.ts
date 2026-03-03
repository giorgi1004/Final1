import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from '../header/header';
import { Phone } from '../services/phone'; 
import data from '../../db.json'; 

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product implements OnInit {
  public phoneService = inject(Phone);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  phone: any;
  quantity: number = 1;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const saved = localStorage.getItem('saved_phones');
    const allPhones = saved ? JSON.parse(saved) : data.phones;
    this.phone = allPhones.find((p: any) => p.id === id);
  }

  deleteProduct() {
    if (confirm(`Are you sure you want to delete ${this.phone.model}?`)) {
      const saved = localStorage.getItem('saved_phones');
      let allPhones = saved ? JSON.parse(saved) : [...data.phones];
      allPhones = allPhones.filter((p: any) => p.id !== this.phone.id);
      localStorage.setItem('saved_phones', JSON.stringify(allPhones));
      this.router.navigate(['/']); 
    }
  }

  addToCart() {
    const qty = Number(this.quantity);
    const existingItem = Header.cartItems.find(item => item.id === this.phone.id);

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 0) + qty;
    } else {
      Header.cartItems.push({ ...this.phone, quantity: qty });
    }
    console.log('Added to cart:', this.phone.model, 'Qty:', qty);
  }
}



