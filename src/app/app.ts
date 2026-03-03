import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { Login } from "./login/login";
import { Main } from "./main/main";


@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Projects');
   sharedSearchText: string = ''; 

   updateSearch(text: string) {
    this.sharedSearchText = text;
  }


  isLoginPage = false;

constructor(private router: Router) {
  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      this.isLoginPage = event.urlAfterRedirects.includes('login');
    }
  });
}
}
