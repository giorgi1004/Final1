import { Component } from '@angular/core'; 
import { Router } from "@angular/router";
import { Phone } from "../services/phone";
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class Login {
  username = '';
  password = '';
  email = '';
  errorMsg = '';

  
    constructor(
    private router: Router,
    public phoneService: Phone 
  ) {}

  onSubmit() {
    this.errorMsg = '';
    
    if (!this.email.includes('@')) {
      this.errorMsg = 'Email must contain @ character';
      return;
    }

    const isAdmin = this.username === 'admin' && this.password === 'admin123' && this.email === 'admin@mail.com';
    const isUser = this.username === 'user' && this.password === 'user123' && this.email === 'user@mail.com';

    if (isAdmin || isUser) {
      this.phoneService.currentUser = { 
        username: this.username, 
        email: this.email,
        role: isAdmin ? 'admin' : 'user'
      };
      this.router.navigate(['/']);
    } else {
      this.errorMsg = 'Invalid credentials';
    }
  }
}







