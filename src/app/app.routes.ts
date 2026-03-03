import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Main } from './main/main';
import { Cart } from './cart/cart';
import { Product } from './product/product'; 


export const routes: Routes = [
    { 
        path: '', component: Main 
    },
    {
        path: 'login',
        component: Login
    },{ 
        path: 'cart', component: Cart 
    },
    { path: 'product/:id', component: Product 
        
    }, 

];
