import { Component, inject, OnInit } from '@angular/core';
import { Slider } from "../slider/slider";
import { Header } from '../header/header'; 
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Footer } from "../footer/footer";
import { Phone } from '../services/phone';
import { FormsModule } from '@angular/forms';
import data from '../../db.json'; 

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterLink, Footer, FormsModule, Slider],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main implements OnInit {
  public phoneService = inject(Phone);
  
  phones: any[] = []; 
  selectedBrands: Set<string> = new Set();
  isFormVisible = false;
  newProduct = { brand: '', model: '', price: 0, image: '', description: '' };

  ngOnInit() {
    const saved = localStorage.getItem('saved_phones');
    
    if (saved && JSON.parse(saved).length > 0) {
      this.phones = JSON.parse(saved);
    } else {
    
      this.phones = data.phones;
      console.log('Data loaded directly from file:', this.phones);
    }
  }

  get filtered() {
    const search = (Header.searchText || '').toLowerCase().trim();
    
    
    let result = this.phones.filter((p: any) => {
      const matchesSearch = !search || 
                            p.model.toLowerCase().includes(search) || 
                            p.brand.toLowerCase().includes(search);
      
      const matchesBrand = this.selectedBrands.size === 0 || 
                           this.selectedBrands.has(p.brand);
                           
      return matchesSearch && matchesBrand;
    });

    if (!search && this.selectedBrands.size === 0) {
      const iphone = result.filter(p => p.brand === 'iPhone').slice(0, 3);
      const samsung = result.filter(p => p.brand === 'Samsung').slice(0, 3);
      const huawei = result.filter(p => p.brand === 'Huawei').slice(0, 3);
      
      return [...iphone, ...samsung, ...huawei];
    }

    return result;
  }
 

  saveProduct() {
    if (!this.newProduct.brand || !this.newProduct.model || !this.newProduct.image) {
      alert("Fill in all fields!");
      return;
    }
    
    const nextId = this.phones.length > 0 ? Math.max(...this.phones.map(p => p.id)) + 1 : 1;
    const productWithId = { ...this.newProduct, id: nextId };
    
    this.phones = [productWithId, ...this.phones];
    localStorage.setItem('saved_phones', JSON.stringify(this.phones));
    
    this.toggleForm();
    this.newProduct = { brand: '', model: '', price: 0, image: '', description: '' };
  }
 

  onCheck(brand: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) this.selectedBrands.add(brand);
    else this.selectedBrands.delete(brand);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => { this.newProduct.image = e.target.result; };
      reader.readAsDataURL(file);
    }
  }

  toggleForm() { this.isFormVisible = !this.isFormVisible; }

    addToCart(phone: any) { 
    
    const existingItem = Header.cartItems.find(item => item.id === phone.id);

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      Header.cartItems.push({ ...phone, quantity: 1 });
    }
    
    console.log('Added from Main:', phone.model);
  }
}




